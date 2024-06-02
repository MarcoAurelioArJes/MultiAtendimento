using AutoMapper;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Models;
using System.Net;

namespace MultiAtendimento.API.Services
{
    public class SetorService
    {
        private readonly IMapper _mapper;
        private readonly ISetorRepository _setorRepository;
        private readonly IHttpContextAccessor _httpContext;

        public SetorService(IMapper mapper, ISetorRepository setorRepository, IHttpContextAccessor httpContext)
        {
            _mapper = mapper;
            _setorRepository = setorRepository;
            _httpContext = httpContext;
        }

        public void Criar(SetorInput setorInput)
        {
            var setor = _mapper.Map<Setor>(setorInput);
            
            var empresaCnpj = _httpContext.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("empresaCnpj"))?.Value;
            setor.EmpresaCnpj = empresaCnpj;

            _setorRepository.Criar(setor);
        }

        public void Atualizar(int id, SetorInput setorInput)
        {
            var setorDb = _setorRepository.ObterPorId(id);
            if (setorDb is null)
                throw new BadHttpRequestException($"Não existe setor com o id {id}", (int)HttpStatusCode.NotFound);

            var setor = _mapper.Map<Setor>(setorInput);
            _setorRepository.Atualizar(setor);
        }

        public Setor ObterPorId(int id)
        {
            var setorDb = _setorRepository.ObterPorId(id);
            if (setorDb is null)
                throw new BadHttpRequestException($"Não existe setor com o id {id}", (int)HttpStatusCode.NotFound);

            return setorDb;
        }

        public List<Setor> ObterTodosOsSetores()
        {
            var empresaCnpj = _httpContext.HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("empresaCnpj"))?.Value;
            return _setorRepository.ObterTodosPorCnpjDaEmpresa(empresaCnpj);
        }
    }
}
