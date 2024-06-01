using Microsoft.EntityFrameworkCore;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository.BancoDeDados;

namespace MultiAtendimento.API.Repository
{
    public class UsuarioRepository : BaseRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(ContextoDoBancoDeDados contextoDoBancoDeDados)
            : base(contextoDoBancoDeDados)
        {
        }

        public Usuario ObterPorEmail(string email)
        {
            return _dbSet
                        .Where(u => u.Email == email).FirstOrDefault();
        }
    }
}
