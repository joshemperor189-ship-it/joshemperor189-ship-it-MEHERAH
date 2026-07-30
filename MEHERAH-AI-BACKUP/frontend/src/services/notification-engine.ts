import { config } from 'dotenv';
config();

export interface BlockedActionPayload {
  type: string;
  reason: string;
  agent: string;
  timestamp: string;
  requiredApproval: string;
}

export class NotificationEngine {
  // Configured exclusively through runtime environment variables
  private emailWebhookUrl: string | undefined = process.env.NOTIFICATION_EMAIL_WEBHOOK;
  private smsGatewayUrl: string | undefined = process.env.NOTIFICATION_SMS_GATEWAY;
  private whatsappApiUrl: string | undefined = process.env.NOTIFICATION_WHATSAPP_API;

  /**
   * Dispatches alerts systematically across all active channels
   */
  public async dispatchGovernanceAlert(payload: BlockedActionPayload): Promise<{ success: boolean; errors: string[] }> {
    const errors: string[] = [];
    const formattedMessage = `🚨 ACTION BLOCKED\nType: ${payload.type}\nReason: ${payload.reason}\nAgent: ${payload.agent}\nTime: ${payload.timestamp}\nRequired: ${payload.requiredApproval}`;

    const jobs = [
      this.sendEmail(payload),
      this.sendSMS(formattedMessage),
      this.sendWhatsApp(formattedMessage)
    ];

    const results = await Promise.allSettled(jobs);
    
    results.forEach((res, index) => {
      if (res.status === 'rejected') {
        errors.push(`Channel ${index} failed: ${(res.reason as Error)?.message || 'Unknown error'}`);
      }
    });

    return {
      success: errors.length === 0,
      errors
    };
  }

  private async sendEmail(payload: BlockedActionPayload): Promise<void> {
    if (!this.emailWebhookUrl) return;
    const response = await fetch(this.emailWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'GOVERNANCE_BLOCKED_ACTION', data: payload })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  }

  private async sendSMS(message: string): Promise<void> {
    if (!this.smsGatewayUrl) return;
    const response = await fetch(this.smsGatewayUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, recipient_group: 'admin' })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  }

  private async sendWhatsApp(message: string): Promise<void> {
    if (!this.whatsappApiUrl) return;
    const response = await fetch(this.whatsappApiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN || ''}`
      },
      body: JSON.stringify({ messaging_product: 'whatsapp', text: { body: message } })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  }
}
