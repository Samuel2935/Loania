@Post('apply')
@UseGuards(JwtAuthGuard)
apply(@Req() req, @Body() dto: CreateLoanDto) {
  return this.loanService.apply(req.user.id, dto);
}