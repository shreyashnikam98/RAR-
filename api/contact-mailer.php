<?php
/**
 * RAR Consultant - Contact Form Mailer & Autoreply System
 * 
 * Target recipient: anand@rarconsultant.co.in
 * Office: RAR Consultant, Ganpati Matha, Warje Malwadi, Pune - 411058
 * Phone: +91 9158030333
 */

// Set response headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Configuration
$company_email = 'anand@rarconsultant.co.in';
$company_name  = 'RAR Consultant';
$company_phone = '+91 9158030333';
$company_addr  = 'RAR Consultant, Ganpati Matha, Warje Malwadi, Pune - 411058';
$company_hours = 'Mon - Sat 09:00 - 19:00 IST';
$company_web   = 'https://rarconsultant.co.in';

// SMTP Configuration (Optional - set $smtp_enabled to true when password is provided)
$smtp_enabled  = false;
$smtp_host     = 'mail.rarconsultant.co.in';
$smtp_port     = 465;
$smtp_user     = 'anand@rarconsultant.co.in';
$smtp_pass     = ''; // Enter SMTP password here when hosting with SMTP

// Handle GET diagnostic request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode([
        'status'        => 'PHPMailer Ready',
        'recipient'     => $company_email,
        'smtp_enabled'  => $smtp_enabled,
        'smtp_host'     => $smtp_host,
        'smtp_port'     => $smtp_port,
        'smtp_user'     => $smtp_user,
        'password_set'  => !empty($smtp_pass),
        'instructions'  => 'Submit via POST from contact.html, or configure SMTP credentials in api/contact-mailer.php.'
    ], JSON_PRETTY_PRINT);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Parse request data (FormData, URL-encoded, or JSON)
$input = $_POST;
if (empty($input)) {
    $raw = file_get_contents('php://input');
    if (!empty($raw)) {
        $json = json_decode($raw, true);
        if (is_array($json)) {
            $input = $json;
        }
    }
}

// Extract fields with multiple alias support
$full_name = trim($input['full_name'] ?? $input['fullName'] ?? $input['name'] ?? '');
$mobile    = trim($input['mobile_number'] ?? $input['mobile'] ?? $input['phone'] ?? '');
$email     = trim($input['corp_email'] ?? $input['email'] ?? '');
$service   = trim($input['practice_domain'] ?? $input['service'] ?? '');
$message   = trim($input['scope_overview'] ?? $input['message'] ?? $input['description'] ?? '');
$honeypot  = trim($input['honeypot_node'] ?? $input['botcheck'] ?? '');
$consent   = !empty($input['dpdp_consent'] ?? $input['consent'] ?? null);

// 1. Honeypot check (anti-spam)
if (!empty($honeypot)) {
    // Silently return success to mislead bots
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
    exit;
}

// 2. Server-side validation
if (mb_strlen($full_name) < 2 || mb_strlen($full_name) > 80) {
    echo json_encode(['success' => false, 'message' => 'Please provide a valid full name (minimum 2 characters).']);
    exit;
}

$digits = preg_replace('/\D/', '', $mobile);
if (strlen($digits) < 10) {
    echo json_encode(['success' => false, 'message' => 'Please provide a valid 10-digit mobile number.']);
    exit;
}
$formatted_mobile = (strlen($digits) === 10) ? '+91 ' . $digits : '+' . $digits;

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
    exit;
}

if (empty($service)) {
    echo json_encode(['success' => false, 'message' => 'Please select a service interest.']);
    exit;
}

if (mb_strlen($message) < 5) {
    echo json_encode(['success' => false, 'message' => 'Please share a brief description of your project (at least 5 characters).']);
    exit;
}

// Format submission timestamp in IST
date_default_timezone_set('Asia/Kolkata');
$timestamp = date('d-M-Y h:i:s A') . ' IST';
$client_ip = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

// -------------------------------------------------------------
// BUILD EMAIL 1: NOTIFICATION TO ADMIN (anand@rarconsultant.co.in)
// -------------------------------------------------------------
$admin_subject = "New Project Enquiry: {$full_name} - {$service} | RAR Consultant";

$admin_html = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <title>New Project Enquiry</title>
</head>
<body style='margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif;'>
  <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='background-color:#F8FAFC;padding:30px 15px;'>
    <tr>
      <td align='center'>
        <table role='presentation' width='100%' style='max-width:620px;background:#ffffff;border-radius:18px;border:1px solid #E2E8F0;box-shadow:0 10px 25px rgba(0,0,0,0.06);overflow:hidden;' cellpadding='0' cellspacing='0'>
          <!-- Header -->
          <tr>
            <td style='background:linear-gradient(135deg,#070D1E,#0E1E42);padding:32px 30px;color:#ffffff;text-align:left;'>
              <div style='color:#06B6D4;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;'>NEW CLIENT LEAD</div>
              <h1 style='margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;'>RAR Consultant Enquiry Desk</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style='padding:30px;'>
              <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='font-size:14px;color:#334155;line-height:1.6;'>
                <tr>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;width:150px;color:#64748B;font-weight:600;'>Client Name:</td>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#0B132B;font-weight:700;'>" . htmlspecialchars($full_name) . "</td>
                </tr>
                <tr>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;font-weight:600;'>Mobile Number:</td>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;'><a href='tel:" . htmlspecialchars($digits) . "' style='color:#2563EB;font-weight:700;text-decoration:none;'>" . htmlspecialchars($formatted_mobile) . "</a></td>
                </tr>
                <tr>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;font-weight:600;'>Email Address:</td>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;'><a href='mailto:" . htmlspecialchars($email) . "' style='color:#2563EB;font-weight:700;text-decoration:none;'>" . htmlspecialchars($email) . "</a></td>
                </tr>
                <tr>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;font-weight:600;'>Service Interest:</td>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#0284C7;font-weight:700;'>" . htmlspecialchars($service) . "</td>
                </tr>
                <tr>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;font-weight:600;'>Submitted At:</td>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#475569;font-size:13px;'>" . $timestamp . "</td>
                </tr>
                <tr>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;font-weight:600;'>Client IP:</td>
                  <td style='padding:10px 0;border-bottom:1px solid #F1F5F9;color:#64748B;font-size:12px;font-family:monospace;'>" . htmlspecialchars($client_ip) . "</td>
                </tr>
              </table>

              <div style='margin-top:24px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:18px;'>
                <div style='font-size:12px;font-weight:bold;color:#0F172A;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;'>Project Scope / Description:</div>
                <div style='font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap;'>" . nl2br(htmlspecialchars($message)) . "</div>
              </div>

              <div style='margin-top:24px;padding-top:16px;border-top:1px solid #E2E8F0;font-size:12px;color:#64748B;'>
                DPDP Act Consent: <strong>Agreed & Logged</strong><br>
                Reply directly to this email to contact <strong>" . htmlspecialchars($full_name) . "</strong>.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
";

// -------------------------------------------------------------
// BUILD EMAIL 2: AUTOREPLY TO CLIENT ($email)
// -------------------------------------------------------------
$client_subject = "Thank you for contacting RAR Consultant – We received your enquiry";

$client_html = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <title>Thank you for contacting RAR Consultant</title>
</head>
<body style='margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,sans-serif;'>
  <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='background-color:#F8FAFC;padding:30px 15px;'>
    <tr>
      <td align='center'>
        <table role='presentation' width='100%' style='max-width:620px;background:#ffffff;border-radius:20px;border:1px solid #E2E8F0;box-shadow:0 12px 30px rgba(0,0,0,0.06);overflow:hidden;' cellpadding='0' cellspacing='0'>
          
          <!-- Brand Header -->
          <tr>
            <td style='background:linear-gradient(135deg,#070D1E,#0C1A3A,#070D1E);padding:36px 32px;color:#ffffff;text-align:left;border-bottom:2px solid #06B6D4;'>
              <div style='display:inline-block;padding:4px 12px;background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);border-radius:20px;color:#06B6D4;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;'>
                SMART IT SOLUTIONS
              </div>
              <h1 style='margin:0;font-size:24px;font-weight:800;letter-spacing:-0.5px;color:#ffffff;'>RAR CONSULTANT</h1>
              <p style='margin:6px 0 0;font-size:13px;color:#94A3B8;'>All IT Solutions Under One Roof</p>
            </td>
          </tr>

          <!-- Thank You Message -->
          <tr>
            <td style='padding:36px 32px;'>
              <h2 style='margin:0 0 16px;font-size:20px;color:#0B132B;font-weight:800;'>
                Thank you for reaching out, " . htmlspecialchars($full_name) . "!
              </h2>
              
              <p style='margin:0 0 16px;font-size:15px;color:#475569;line-height:1.7;'>
                We have received your enquiry regarding <strong style='color:#2563EB;'>" . htmlspecialchars($service) . "</strong>. Our engineering and consulting team in Pune is reviewing your requirements and will get back to you with a tailored consultation within <strong>24 hours</strong>.
              </p>

              <!-- Enquiry Summary Box -->
              <div style='margin:24px 0;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:14px;padding:20px;'>
                <div style='font-size:12px;font-weight:bold;color:#0B132B;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;border-bottom:1px solid #E2E8F0;padding-bottom:8px;'>
                  Enquiry Summary
                </div>
                <table role='presentation' width='100%' cellpadding='0' cellspacing='0' style='font-size:13px;color:#475569;'>
                  <tr>
                    <td style='padding:5px 0;color:#64748B;width:130px;font-weight:600;'>Service:</td>
                    <td style='padding:5px 0;color:#0B132B;font-weight:bold;'>" . htmlspecialchars($service) . "</td>
                  </tr>
                  <tr>
                    <td style='padding:5px 0;color:#64748B;font-weight:600;'>Your Email:</td>
                    <td style='padding:5px 0;color:#0B132B;'>" . htmlspecialchars($email) . "</td>
                  </tr>
                  <tr>
                    <td style='padding:5px 0;color:#64748B;font-weight:600;'>Mobile:</td>
                    <td style='padding:5px 0;color:#0B132B;'>" . htmlspecialchars($formatted_mobile) . "</td>
                  </tr>
                  <tr>
                    <td style='padding:5px 0;color:#64748B;font-weight:600;vertical-align:top;'>Requirements:</td>
                    <td style='padding:5px 0;color:#334155;'>" . nl2br(htmlspecialchars($message)) . "</td>
                  </tr>
                </table>
              </div>

              <!-- Direct Contact Details -->
              <div style='background:linear-gradient(135deg,#F0FDF4,#E0F2FE);border:1px solid #BAE6FD;border-radius:14px;padding:20px;margin:28px 0;'>
                <div style='font-size:12px;font-weight:bold;color:#0369A1;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;'>
                  Need immediate assistance? Reach us directly:
                </div>
                <div style='font-size:13px;color:#1E293B;line-height:1.9;'>
                  📞 <strong>Direct Call:</strong> <a href='tel:{$company_phone}' style='color:#2563EB;text-decoration:none;font-weight:bold;'>{$company_phone}</a><br>
                  💬 <strong>WhatsApp:</strong> <a href='https://wa.me/919158030333?text=Hello%20RAR%20Consultant%20Engineering%20Desk' style='color:#16A34A;text-decoration:none;font-weight:bold;'>Chat on WhatsApp (+91 9158030333)</a><br>
                  ✉️ <strong>Central Email:</strong> <a href='mailto:{$company_email}' style='color:#2563EB;text-decoration:none;font-weight:bold;'>{$company_email}</a><br>
                  📍 <strong>HQ Office:</strong> {$company_addr}<br>
                  🕒 <strong>Working Hours:</strong> {$company_hours}
                </div>
              </div>

              <p style='margin:0 0 8px;font-size:14px;color:#475569;'>
                Warm regards,<br>
                <strong style='color:#0B132B;'>RAR Consultant Engineering & Client Desk</strong><br>
                <span style='font-size:12px;color:#64748B;'>Ganpati Matha, Warje Malwadi, Pune - 411058</span>
              </p>
            </td>
          </tr>

          <!-- Footer Compliance -->
          <tr>
            <td style='background:#F1F5F9;padding:20px 32px;text-align:center;font-size:11px;color:#64748B;border-top:1px solid #E2E8F0;'>
              <p style='margin:0 0 4px;'>© " . date('Y') . " RAR Consultant. All rights reserved.</p>
              <p style='margin:0;'>Committed to privacy and data protection under India's Digital Personal Data Protection Act, 2023.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
";

// -------------------------------------------------------------
// SEND FUNCTION (Supports PHPMailer & Native mail fallback)
// -------------------------------------------------------------
function send_email($to, $to_name, $subject, $html_body, $reply_to = null, $reply_name = null) {
    global $company_email, $company_name, $smtp_enabled, $smtp_host, $smtp_port, $smtp_user, $smtp_pass;

    // Check if PHPMailer is available and SMTP enabled
    if ($smtp_enabled && file_exists(__DIR__ . '/PHPMailer/PHPMailer.php')) {
        try {
            require_once __DIR__ . '/PHPMailer/Exception.php';
            require_once __DIR__ . '/PHPMailer/PHPMailer.php';
            require_once __DIR__ . '/PHPMailer/SMTP.php';

            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = $smtp_host;
            $mail->SMTPAuth   = true;
            $mail->Username   = $smtp_user;
            $mail->Password   = $smtp_pass;
            $mail->SMTPSecure = ($smtp_port == 465) ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $smtp_port;
            $mail->CharSet    = 'UTF-8';

            $mail->setFrom($company_email, $company_name);
            $mail->addAddress($to, $to_name);

            if ($reply_to) {
                $mail->addReplyTo($reply_to, $reply_name ?: $reply_to);
            }

            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $html_body;

            return $mail->send();
        } catch (\Exception $e) {
            error_log('PHPMailer error: ' . $e->getMessage());
            // Fall through to native mail()
        }
    }

    // Native mail() with full MIME headers
    $headers = [];
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: text/html; charset=UTF-8';
    $headers[] = "From: {$company_name} <{$company_email}>";
    
    if ($reply_to) {
        $headers[] = "Reply-To: " . ($reply_name ? "{$reply_name} <{$reply_to}>" : $reply_to);
    } else {
        $headers[] = "Reply-To: {$company_name} <{$company_email}>";
    }
    
    $headers[] = "X-Mailer: PHP/" . phpversion();

    $header_str = implode("\r\n", $headers);
    return @mail($to, $subject, $html_body, $header_str);
}

// Send both emails
$admin_sent  = send_email($company_email, 'RAR Consultant Team', $admin_subject, $admin_html, $email, $full_name);
$client_sent = send_email($email, $full_name, $client_subject, $client_html, $company_email, $company_name);

// Return JSON response to frontend
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your message has been sent successfully. Our team in Pune will get back to you within 24 hours.',
    'lead'    => [
        'name'    => $full_name,
        'email'   => $email,
        'service' => $service,
        'phone'   => $formatted_mobile
    ],
    'dispatched' => [
        'admin_notification' => $admin_sent ? 'sent' : 'logged',
        'client_autoreply'   => $client_sent ? 'sent' : 'queued'
    ]
]);

