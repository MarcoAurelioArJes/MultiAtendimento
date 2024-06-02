using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MultiAtendimento.API.Migrations
{
    /// <inheritdoc />
    public partial class RemovendoDataEHoraMensagens : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataEHora",
                table: "Mensagens");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataEHora",
                table: "Mensagens",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
