using Microsoft.EntityFrameworkCore;
using MultiAtendimento.API.Models;

namespace MultiAtendimento.API.Repositorio.BancoDeDados
{
    public class ContextoDoBancoDeDados : DbContext
    {
        private readonly IConfiguration _configuration;
        public ContextoDoBancoDeDados(DbContextOptions dbContextOptions, IConfiguration configuration) : base(dbContextOptions)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);

            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Setor> Setores { get; set; }
        public DbSet<Cargo> Cargos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Mensagem> Mensagens { get; set; }
    }
}
