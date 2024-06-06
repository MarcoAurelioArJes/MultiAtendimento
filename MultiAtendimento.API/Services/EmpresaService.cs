using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Enums;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository;

namespace MultiAtendimento.API.Services
{
    public class EmpresaService
    {
        private readonly IEmpresaRepository _empresaRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly ISetorRepository _setorRepository;

        public EmpresaService(IEmpresaRepository empresaRepository, IUsuarioRepository usuarioRepository, ISetorRepository setorRepository)
        {
            _empresaRepository = empresaRepository;
            _usuarioRepository = usuarioRepository;
            _setorRepository = setorRepository;
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

            var setor = new Setor
            {
                EmpresaCnpj = empresa.Cnpj,
                Nome = "Admin"
            };
            _setorRepository.Criar(setor);

            var usuario = new Usuario
            {
                Nome = cadastroEmpresaInput.NomeUsuario,
                Senha = HashDeSenhaService.ObterSenhaHash(cadastroEmpresaInput.Senha),
                EmpresaCnpj = cadastroEmpresaInput.Cnpj,
                Email = cadastroEmpresaInput.Email,
                Cargo = CargoEnum.ADMIN,
                SetorId = setor.Id
            };
            _usuarioRepository.Criar(usuario);
        }
    }
}
