@Post('webhook')
handleWebhook(@Body() body) {
  // verify payment with provider

  if (body.status === 'success') {
    // mark repayment as paid
  }

  return { received: true };
}