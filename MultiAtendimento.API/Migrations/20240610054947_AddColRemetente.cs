using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MultiAtendimento.API.Migrations
{
    /// <inheritdoc />
    public partial class AddColRemetente : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remetente",
                table: "Mensagens",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remetente",
                table: "Mensagens");
        }
    }
}
