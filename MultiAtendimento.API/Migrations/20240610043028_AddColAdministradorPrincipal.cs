using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MultiAtendimento.API.Migrations
{
    /// <inheritdoc />
    public partial class AddColAdministradorPrincipal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "AdministradorPrincipal",
                table: "Usuarios",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AdministradorPrincipal",
                table: "Usuarios");
        }
    }
}
