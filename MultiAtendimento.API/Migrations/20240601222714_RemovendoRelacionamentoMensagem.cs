using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MultiAtendimento.API.Migrations
{
    /// <inheritdoc />
    public partial class RemovendoRelacionamentoMensagem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mensagens_Clientes_ClienteId",
                table: "Mensagens");

            migrationBuilder.DropForeignKey(
                name: "FK_Mensagens_Usuarios_AtendenteId",
                table: "Mensagens");

            migrationBuilder.DropIndex(
                name: "IX_Mensagens_AtendenteId",
                table: "Mensagens");

            migrationBuilder.DropIndex(
                name: "IX_Mensagens_ClienteId",
                table: "Mensagens");

            migrationBuilder.DropColumn(
                name: "AtendenteId",
                table: "Mensagens");

            migrationBuilder.DropColumn(
                name: "ClienteId",
                table: "Mensagens");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AtendenteId",
                table: "Mensagens",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ClienteId",
                table: "Mensagens",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_AtendenteId",
                table: "Mensagens",
                column: "AtendenteId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_ClienteId",
                table: "Mensagens",
                column: "ClienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mensagens_Clientes_ClienteId",
                table: "Mensagens",
                column: "ClienteId",
                principalTable: "Clientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Mensagens_Usuarios_AtendenteId",
                table: "Mensagens",
                column: "AtendenteId",
                principalTable: "Usuarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
