import fs from 'fs';
import path from 'path';

export function createMimeEmailRaw({
  to,
  subject,
  htmlBody,
  attachmentPath,
  attachmentName,
}: {
  to: string;
  subject: string;
  htmlBody: string;
  attachmentPath?: string;
  attachmentName?: string;
}): string {
  const boundary = `MEHERAH_BACKUP_BOUNDARY_${Date.now()}`;
  const lines: string[] = [
    `From: meherah-system@ai.studio`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    htmlBody,
    ``,
  ];

  if (attachmentPath && fs.existsSync(attachmentPath)) {
    const fileBuffer = fs.readFileSync(attachmentPath);
    const base64Content = fileBuffer.toString('base64');
    const filename = attachmentName || path.basename(attachmentPath);

    lines.push(`--${boundary}`);
    lines.push(`Content-Type: application/zip; name="${filename}"`);
    lines.push(`Content-Disposition: attachment; filename="${filename}"`);
    lines.push(`Content-Transfer-Encoding: base64`);
    lines.push(``);
    lines.push(base64Content);
    lines.push(``);
  }

  lines.push(`--${boundary}--`);

  const fullMimeText = lines.join('\r\n');
  return Buffer.from(fullMimeText)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export async function sendEmailViaGmailApi({
  accessToken,
  recipientEmail,
  subject,
  htmlBody,
  attachmentPath,
  attachmentName,
}: {
  accessToken: string;
  recipientEmail: string;
  subject: string;
  htmlBody: string;
  attachmentPath?: string;
  attachmentName?: string;
}) {
  const rawBase64Url = createMimeEmailRaw({
    to: recipientEmail,
    subject,
    htmlBody,
    attachmentPath,
    attachmentName,
  });

  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      raw: rawBase64Url,
    }),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      responseData?.error?.message ||
        `Gmail API returned status ${response.status}: ${JSON.stringify(responseData)}`
    );
  }

  return responseData;
}
