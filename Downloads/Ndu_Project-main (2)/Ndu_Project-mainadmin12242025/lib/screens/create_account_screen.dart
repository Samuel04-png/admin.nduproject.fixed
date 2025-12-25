import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:go_router/go_router.dart';
import 'package:ndu_project/theme.dart';
import 'package:ndu_project/widgets/app_logo.dart';
import 'package:ndu_project/widgets/responsive.dart';
import 'package:ndu_project/widgets/elevated_auth_container.dart';
import 'package:ndu_project/services/firebase_auth_service.dart';
import 'package:ndu_project/screens/sign_in_screen.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:ndu_project/screens/home_screen.dart';
import 'package:ndu_project/routing/app_router.dart';

class CreateAccountScreen extends StatefulWidget {
  const CreateAccountScreen({super.key});

  @override
  State<CreateAccountScreen> createState() => _CreateAccountScreenState();
}

class _CreateAccountScreenState extends State<CreateAccountScreen> {
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _companyController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  
  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;
  bool _agreeToPrivacyPolicy = false;
  bool _isLoading = false;

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    _companyController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleGoogleSignIn(BuildContext context) async {
    setState(() {
      _isLoading = true;
    });

    try {
      await FirebaseAuthService.signInWithGoogle();
      if (!context.mounted) return;
        _showSuccessSnackBar('Successfully signed in with Google!');
        // Navigate to the authenticated landing screen
      // ignore: use_build_context_synchronously
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => const HomeScreen(),
          ),
        );
    } catch (e) {
      if (mounted) {
        _showErrorSnackBar('Sign in failed: ${e.toString()}');
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  bool _isValidEmail(String email) {
    return RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(email);
  }

  Future<void> _handleEmailSignUp() async {
    // Validate form
    if (_firstNameController.text.trim().isEmpty ||
        _lastNameController.text.trim().isEmpty ||
        _emailController.text.trim().isEmpty ||
        _passwordController.text.isEmpty ||
        _confirmPasswordController.text.isEmpty) {
      _showErrorSnackBar('Please fill in all fields');
      return;
    }

    if (!_isValidEmail(_emailController.text.trim())) {
      _showErrorSnackBar('Please enter a valid email address');
      return;
    }

    if (_passwordController.text.length < 6) {
      _showErrorSnackBar('Password must be at least 6 characters long');
      return;
    }

    if (_passwordController.text != _confirmPasswordController.text) {
      _showErrorSnackBar('Passwords do not match');
      return;
    }

    if (!_agreeToPrivacyPolicy) {
      _showErrorSnackBar('Please agree to the Privacy Policy and Terms & Conditions');
      return;
    }

    setState(() {
      _isLoading = true;
    });

    try {
      // Attempt real Firebase Auth sign up
      final String email = _emailController.text.trim();
      final String password = _passwordController.text;
      final String fullName = '${_firstNameController.text.trim()} ${_lastNameController.text.trim()}'.trim();

      final cred = await FirebaseAuth.instance.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      // Set display name
      if (cred.user != null && fullName.isNotEmpty) {
        await cred.user!.updateDisplayName(fullName);
      }

      // Send verification email
      await cred.user?.sendEmailVerification();

      if (!mounted) return;

      // Inform user and route to Sign In
      await showDialog(
        context: context,
        builder: (ctx) {
          return AlertDialog(
            title: const Text('Verify your email'),
            content: Text(
              'We\'ve sent a verification link to\n$email. Please verify your email before signing in.',
            ),
            actions: [
              TextButton(
                onPressed: () async {
                  // Provide a quick way to resend once
                  try {
                    await FirebaseAuth.instance.currentUser?.sendEmailVerification();
                    if (mounted) {
                      _showSuccessSnackBar('Verification email resent');
                    }
                  } catch (_) {}
                },
                child: const Text('Resend'),
              ),
              ElevatedButton(
                onPressed: () => Navigator.of(ctx).pop(),
                style: ElevatedButton.styleFrom(
                  backgroundColor: LightModeColors.accent,
                  foregroundColor: Colors.white,
                ),
                child: const Text('OK'),
              ),
            ],
          );
        },
      );

      if (!mounted) return;
      _showSuccessSnackBar('Verification email sent');

      // Navigate to Sign In so the user can log in after verifying
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const SignInScreen(),
        ),
      );
    } on FirebaseAuthException catch (e) {
      if (mounted) {
        String errorMessage;
        switch (e.code) {
          case 'email-already-in-use':
            errorMessage = 'An account already exists with this email address.';
            break;
          case 'invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'weak-password':
            errorMessage = 'Password is too weak. Please use a stronger password.';
            break;
          case 'operation-not-allowed':
            errorMessage = 'Email/password sign up is not enabled.';
            break;
          default:
            errorMessage = e.message ?? 'Sign up failed. Please try again.';
        }
        _showErrorSnackBar(errorMessage);
      }
    } catch (e) {
      if (mounted) {
        _showErrorSnackBar('Sign up failed: ${e.toString()}');
      }
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _showErrorSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  void _showSuccessSnackBar(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.green,
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final bool isMobile = AppBreakpoints.isMobile(context);
    final bool isTablet = AppBreakpoints.isTablet(context);
    final bool isDesktop = AppBreakpoints.isDesktop(context);

    // Responsive content max width
    final double maxContentWidth = isDesktop ? 480 : (isTablet ? 440 : 400);

    // Control common paddings/spacings
    final EdgeInsets pagePadding = EdgeInsets.symmetric(
      horizontal: AppBreakpoints.pagePadding(context),
      vertical: 32,
    );

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              const Color(0xFFFAFAFA),
              const Color(0xFFF5F7FA),
              Colors.white,
            ],
          ),
        ),
        child: SingleChildScrollView(
        padding: pagePadding,
        child: Center(
          child: ConstrainedBox(
            constraints: BoxConstraints(maxWidth: maxContentWidth),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                  const SizedBox(height: 20),
                  Center(
                    child: Hero(
                      tag: 'app_logo',
                      child: AppLogo(
                        height: isDesktop ? 100 : (isTablet ? 90 : 80),
                        enableTapToDashboard: false,
                      ),
                    ),
                  ),
                  const SizedBox(height: 40),
                Center(
                  child: Text(
                    'Create Account',
                    style: TextStyle(
                        fontSize: isDesktop ? 36 : 32,
                        fontWeight: FontWeight.w800,
                      color: Colors.grey[800],
                        letterSpacing: -0.5,
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Center(
                    child: Text(
                      'Sign up to get started with NDU Project',
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.grey[600],
                        fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
                  const SizedBox(height: 32),
                ElevatedAuthContainer(
                  maxWidth: maxContentWidth,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: double.infinity,
                          height: 56,
                        child: OutlinedButton.icon(
                          onPressed: _isLoading ? null : () => _handleGoogleSignIn(context),
                          icon: Image.asset('assets/images/search.png', height: 20, width: 20),
                          label: _isLoading
                              ? const SizedBox(
                                  width: 18,
                                  height: 18,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(Colors.black87),
                                  ),
                                )
                              : const Text(
                                    'Continue with Google',
                                  style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w600,
                                    color: Colors.black87,
                                  ),
                                ),
                          style: OutlinedButton.styleFrom(
                              side: BorderSide(color: Colors.grey.shade300, width: 1.5),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            backgroundColor: Colors.white,
                          ),
                        ),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        children: [
                          Expanded(child: Divider(color: Colors.grey[300], thickness: 1)),
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16),
                            child: Text('OR', style: TextStyle(color: Colors.grey[600], fontSize: 13)),
                          ),
                          Expanded(child: Divider(color: Colors.grey[300], thickness: 1)),
                        ],
                      ),
                      const SizedBox(height: 20),

                      if (isMobile)
                        Column(
                          children: [
                            _NameField(label: 'First Name', controller: _firstNameController),
                            const SizedBox(height: 16),
                            _NameField(label: 'Last Name', controller: _lastNameController),
                          ],
                        )
                      else
                        Row(
                          children: [
                            Expanded(child: _NameField(label: 'First Name', controller: _firstNameController)),
                            const SizedBox(width: 16),
                            Expanded(child: _NameField(label: 'Last Name', controller: _lastNameController)),
                          ],
                        ),
                      const SizedBox(height: 16),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Company Name', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.grey[800])),
                          const SizedBox(height: 8),
                          SizedBox(
                              height: 56,
                            child: TextField(
                              controller: _companyController,
                              style: const TextStyle(fontSize: 15),
                              decoration: InputDecoration(
                                hintText: 'Company',
                                hintStyle: TextStyle(color: Colors.grey[500], fontSize: 15),
                                  prefixIcon: const Icon(Icons.business_outlined, color: Colors.grey),
                                  filled: true,
                                  fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: const BorderSide(color: LightModeColors.accent, width: 2),
                                ),
                                  contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Email', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.grey[800])),
                          const SizedBox(height: 8),
                          SizedBox(
                              height: 56,
                            child: TextField(
                              controller: _emailController,
                              keyboardType: TextInputType.emailAddress,
                              style: const TextStyle(fontSize: 15),
                              decoration: InputDecoration(
                                hintText: 'Email@gmail.com',
                                hintStyle: TextStyle(color: Colors.grey[500], fontSize: 15),
                                  prefixIcon: const Icon(Icons.email_outlined, color: Colors.grey),
                                  filled: true,
                                  fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: const BorderSide(color: LightModeColors.accent, width: 2),
                                ),
                                  contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Password', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.grey[800])),
                          const SizedBox(height: 8),
                          SizedBox(
                              height: 56,
                            child: TextField(
                              controller: _passwordController,
                              obscureText: !_isPasswordVisible,
                              style: const TextStyle(fontSize: 15),
                              decoration: InputDecoration(
                                hintText: '••••••••••',
                                hintStyle: TextStyle(color: Colors.grey[500], fontSize: 15),
                                  prefixIcon: const Icon(Icons.lock_outline, color: Colors.grey),
                                  filled: true,
                                  fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: const BorderSide(color: LightModeColors.accent, width: 2),
                                ),
                                  contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
                                suffixIcon: IconButton(
                                  icon: Icon(_isPasswordVisible ? Icons.visibility_off : Icons.visibility, color: Colors.grey[600]),
                                  onPressed: () => setState(() => _isPasswordVisible = !_isPasswordVisible),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Confirm Password', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: Colors.grey[800])),
                          const SizedBox(height: 8),
                          SizedBox(
                              height: 56,
                            child: TextField(
                              controller: _confirmPasswordController,
                              obscureText: !_isConfirmPasswordVisible,
                              style: const TextStyle(fontSize: 15),
                              decoration: InputDecoration(
                                hintText: '••••••••••',
                                hintStyle: TextStyle(color: Colors.grey[500], fontSize: 15),
                                  prefixIcon: const Icon(Icons.lock_outline, color: Colors.grey),
                                  filled: true,
                                  fillColor: Colors.white,
                                border: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                enabledBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
                                ),
                                focusedBorder: OutlineInputBorder(
                                    borderRadius: BorderRadius.circular(14),
                                    borderSide: const BorderSide(color: LightModeColors.accent, width: 2),
                                ),
                                  contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
                                suffixIcon: IconButton(
                                  icon: Icon(_isConfirmPasswordVisible ? Icons.visibility_off : Icons.visibility, color: Colors.grey[600]),
                                  onPressed: () => setState(() => _isConfirmPasswordVisible = !_isConfirmPasswordVisible),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),

                      Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          Checkbox(
                            value: _agreeToPrivacyPolicy,
                            onChanged: (value) => setState(() => _agreeToPrivacyPolicy = value ?? false),
                            activeColor: LightModeColors.accent,
                            materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
                          ),
                          Expanded(
                            child: Text.rich(
                              TextSpan(
                                style: TextStyle(color: Colors.grey[600], fontSize: 13),
                                children: [
                                  const TextSpan(text: 'I agree to the '),
                                  TextSpan(
                                    text: 'Terms and Conditions',
                                    style: TextStyle(color: Colors.grey[800], decoration: TextDecoration.underline, fontWeight: FontWeight.w600),
                                    recognizer: TapGestureRecognizer()
                                      ..onTap = () => context.push('/${AppRoutes.termsConditions}'),
                                  ),
                                  const TextSpan(text: ' and '),
                                  TextSpan(
                                    text: 'Privacy Policy',
                                    style: TextStyle(color: Colors.grey[800], decoration: TextDecoration.underline, fontWeight: FontWeight.w600),
                                    recognizer: TapGestureRecognizer()
                                      ..onTap = () => context.push('/${AppRoutes.privacyPolicy}'),
                                  ),
                                ],
                              ),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              softWrap: true,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 24),

                      SizedBox(
                        width: double.infinity,
                          height: 56,
                        child: ElevatedButton(
                          onPressed: _isLoading ? null : _handleEmailSignUp,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: LightModeColors.accent,
                            foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            elevation: 0,
                            ).copyWith(
                              elevation: WidgetStateProperty.resolveWith<double>(
                                (Set<WidgetState> states) {
                                  if (states.contains(WidgetState.pressed)) return 0;
                                  if (states.contains(WidgetState.hovered)) return 4;
                                  return 0;
                                },
                              ),
                          ),
                          child: _isLoading
                              ? const SizedBox(
                                  width: 20,
                                  height: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2,
                                    valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                                  ),
                                )
                              : const Text('Get Started', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 24),
                Center(
                  child: GestureDetector(
                  onTap: () {
                      if (!context.mounted) return;
                      // ignore: use_build_context_synchronously
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => const SignInScreen()),
                    );
                  },
                  child: RichText(
                    text: TextSpan(
                      style: TextStyle(color: Colors.grey[600], fontSize: 13),
                      children: [
                          const TextSpan(text: 'Already have an account? '),
                        TextSpan(
                            text: 'Sign In',
                            style: TextStyle(
                              color: LightModeColors.accent,
                              decoration: TextDecoration.underline,
                              fontWeight: FontWeight.w600,
                            ),
                        ),
                      ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
            ),
          ),
        ),
      ),
    );
  }
}

class _NameField extends StatelessWidget {
  const _NameField({required this.label, required this.controller});

  final String label;
  final TextEditingController controller;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w600,
            color: Colors.grey[800],
          ),
        ),
        const SizedBox(height: 8),
        SizedBox(
          height: 56,
          child: TextField(
            controller: controller,
            style: const TextStyle(fontSize: 15),
            decoration: InputDecoration(
              hintText: label,
              hintStyle: TextStyle(color: Colors.grey[500], fontSize: 15),
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: BorderSide(color: Colors.grey.shade300, width: 1.5),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(14),
                borderSide: const BorderSide(color: LightModeColors.accent, width: 2),
              ),
              contentPadding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
            ),
          ),
        ),
      ],
    );
  }
}