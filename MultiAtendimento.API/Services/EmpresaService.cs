using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Enums;
using MultiAtendimento.API.Models.Interfaces;

namespace MultiAtendimento.API.Services
{
    public class EmpresaService
    {
        private readonly IEmpresaRepository _empresaRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        public EmpresaService(IEmpresaRepository empresaRepository, IUsuarioRepository usuarioRepository)
        {
            _empresaRepository = empresaRepository;
            _usuarioRepository = usuarioRepository;
        }

        public void Criar(CadastroEmpresaInput cadastroEmpresaInput)
        {
            var empresaExiste = _empresaRepository.ObterEmpresaPorCnpj(cadastroEmpresaInput.Cnpj) != null;
            if (empresaExiste)
                throw new BadHttpRequestException("CNPJ já cadastrado no sistema, tente realizar login utilizando o usuário admin");

            var empresa = new Empresa
            {
                Cnpj = cadastroEmpresaInput.Cnpj,
                Nome = cadastroEmpresaInput.NomeEmpresa
            };

            _empresaRepository.Criar(empresa);

            var usuario = new Usuario
            {
                Nome = cadastroEmpresaInput.NomeUsuario,
                Senha = HashDeSenhaService.ObterSenhaHash(cadastroEmpresaInput.Senha),
                EmpresaCnpj = cadastroEmpresaInput.Cnpj,
                Email = cadastroEmpresaInput.Email,
                Cargo = CargoEnum.ADMIN
            };
            _usuarioRepository.Criar(usuario);
        }
    }
}
