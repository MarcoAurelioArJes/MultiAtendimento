using AutoMapper;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository;
using System.Net;

namespace MultiAtendimento.API.Services
{
    public class UsuarioService
    {
        private readonly IMapper _mapper;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly SetorService _setorService;

        public UsuarioService(IMapper mapper, IUsuarioRepository usuarioRepository, SetorService setorService)
        {
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
            _setorService = setorService;
        }

        public void Criar(UsuarioInput usuarioInput)
        {
            var usuario = _mapper.Map<Usuario>(usuarioInput);
            if (usuarioInput.Setor.HasValue)
            {
                var setor = _setorService.ObterPorId(usuarioInput.Setor.Value);
                usuario.Setor = setor;
            }
            //TO DO: Buscar e inserir empresa pela autentificação?

            _usuarioRepository.Criar(usuario);
        }

        public void Atualizar(int id, UsuarioInput usuarioInput)
        {
            var usuarioRegister = _usuarioRepository.ObterPorId(id);
            if (usuarioRegister is null)
                throw new BadHttpRequestException($"Usuário com ID {id} não encontrado", (int)HttpStatusCode.NotFound);

            var usuarioNovo = _mapper.Map<Usuario>(usuarioInput);
            if (usuarioInput.Setor.HasValue)
            {
                var setor = _setorService.ObterPorId(usuarioInput.Setor.Value);
                usuarioNovo.Setor = setor;
            }

            _usuarioRepository.Atualizar(usuarioNovo);
        }

        public Usuario ObterPorId(int id)
        {
            var usuario = _usuarioRepository.ObterPorId(id);
            if (usuario is null)
                throw new BadHttpRequestException($"Usuário com ID {id} não encontrado", (int)HttpStatusCode.NotFound);
            return usuario;
        }

        public Usuario ObterPorEmail(string email)
        {
            var usuario = _usuarioRepository.ObterPorEmail(email);
            if (usuario is null)
                throw new BadHttpRequestException($"Não há nenhum usuario associdado e esse email", (int)HttpStatusCode.NotFound);
            return usuario;
        }

        public List<Usuario> ObterTodosOsUsuariosPorCnpjDaEmpresa(string cnpj)
        {
            //TO DO: Conferir se cnpj existe antes? 
            return _usuarioRepository.ObterTodosPorCnpjDaEmpresa(cnpj);
        }

    }
}
