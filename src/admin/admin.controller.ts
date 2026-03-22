@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Patch('loans/:id/approve')
approve(@Param('id') id: string) {
  return this.adminService.approveLoan(id);
}