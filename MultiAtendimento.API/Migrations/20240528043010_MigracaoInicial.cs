using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MultiAtendimento.API.Migrations
{
    /// <inheritdoc />
    public partial class MigracaoInicial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Empresas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    Cnpj = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Empresas", x => new { x.Id, x.Cnpj });
                });

            migrationBuilder.CreateTable(
                name: "Cargos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    EmpresaCnpj = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Nivel = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cargos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cargos_Empresas_EmpresaId_EmpresaCnpj",
                        columns: x => new { x.EmpresaId, x.EmpresaCnpj },
                        principalTable: "Empresas",
                        principalColumns: new[] { "Id", "Cnpj" },
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Clientes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    EmpresaCnpj = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clientes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Clientes_Empresas_EmpresaId_EmpresaCnpj",
                        columns: x => new { x.EmpresaId, x.EmpresaCnpj },
                        principalTable: "Empresas",
                        principalColumns: new[] { "Id", "Cnpj" },
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Setores",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    EmpresaCnpj = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Setores", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Setores_Empresas_EmpresaId_EmpresaCnpj",
                        columns: x => new { x.EmpresaId, x.EmpresaCnpj },
                        principalTable: "Empresas",
                        principalColumns: new[] { "Id", "Cnpj" },
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SetorId = table.Column<int>(type: "int", nullable: false),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    EmpresaCnpj = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CargoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usuarios_Cargos_CargoId",
                        column: x => x.CargoId,
                        principalTable: "Cargos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Usuarios_Empresas_EmpresaId_EmpresaCnpj",
                        columns: x => new { x.EmpresaId, x.EmpresaCnpj },
                        principalTable: "Empresas",
                        principalColumns: new[] { "Id", "Cnpj" },
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Usuarios_Setores_SetorId",
                        column: x => x.SetorId,
                        principalTable: "Setores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChatId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    EmpresaCnpj = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AtendenteId = table.Column<int>(type: "int", nullable: false),
                    SetorId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ClienteId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Chats_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Chats_Empresas_EmpresaId_EmpresaCnpj",
                        columns: x => new { x.EmpresaId, x.EmpresaCnpj },
                        principalTable: "Empresas",
                        principalColumns: new[] { "Id", "Cnpj" },
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Chats_Setores_SetorId",
                        column: x => x.SetorId,
                        principalTable: "Setores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Chats_Usuarios_AtendenteId",
                        column: x => x.AtendenteId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "Mensagens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChatId = table.Column<int>(type: "int", nullable: false),
                    AtendenteId = table.Column<int>(type: "int", nullable: false),
                    ClienteId = table.Column<int>(type: "int", nullable: false),
                    EmpresaId = table.Column<int>(type: "int", nullable: false),
                    EmpresaCnpj = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DataEHora = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Conteudo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mensagens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Mensagens_Chats_ChatId",
                        column: x => x.ChatId,
                        principalTable: "Chats",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Mensagens_Clientes_ClienteId",
                        column: x => x.ClienteId,
                        principalTable: "Clientes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Mensagens_Empresas_EmpresaId_EmpresaCnpj",
                        columns: x => new { x.EmpresaId, x.EmpresaCnpj },
                        principalTable: "Empresas",
                        principalColumns: new[] { "Id", "Cnpj" },
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_Mensagens_Usuarios_AtendenteId",
                        column: x => x.AtendenteId,
                        principalTable: "Usuarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cargos_EmpresaId_EmpresaCnpj",
                table: "Cargos",
                columns: new[] { "EmpresaId", "EmpresaCnpj" });

            migrationBuilder.CreateIndex(
                name: "IX_Chats_AtendenteId",
                table: "Chats",
                column: "AtendenteId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_ClienteId",
                table: "Chats",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_EmpresaId_EmpresaCnpj",
                table: "Chats",
                columns: new[] { "EmpresaId", "EmpresaCnpj" });

            migrationBuilder.CreateIndex(
                name: "IX_Chats_SetorId",
                table: "Chats",
                column: "SetorId");

            migrationBuilder.CreateIndex(
                name: "IX_Clientes_EmpresaId_EmpresaCnpj",
                table: "Clientes",
                columns: new[] { "EmpresaId", "EmpresaCnpj" });

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_AtendenteId",
                table: "Mensagens",
                column: "AtendenteId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_ChatId",
                table: "Mensagens",
                column: "ChatId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_ClienteId",
                table: "Mensagens",
                column: "ClienteId");

            migrationBuilder.CreateIndex(
                name: "IX_Mensagens_EmpresaId_EmpresaCnpj",
                table: "Mensagens",
                columns: new[] { "EmpresaId", "EmpresaCnpj" });

            migrationBuilder.CreateIndex(
                name: "IX_Setores_EmpresaId_EmpresaCnpj",
                table: "Setores",
                columns: new[] { "EmpresaId", "EmpresaCnpj" });

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_CargoId",
                table: "Usuarios",
                column: "CargoId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_EmpresaId_EmpresaCnpj",
                table: "Usuarios",
                columns: new[] { "EmpresaId", "EmpresaCnpj" });

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_SetorId",
                table: "Usuarios",
                column: "SetorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Mensagens");

            migrationBuilder.DropTable(
                name: "Chats");

            migrationBuilder.DropTable(
                name: "Clientes");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Cargos");

            migrationBuilder.DropTable(
                name: "Setores");

            migrationBuilder.DropTable(
                name: "Empresas");
        }
    }
}
