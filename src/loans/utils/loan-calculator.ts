@Post('apply')
apply(@Body() body, @Req() req) {
  return this.loanService.apply(
    req.user.id,
    body.amount,
    body.duration
  );
}