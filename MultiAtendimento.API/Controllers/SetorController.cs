using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Interfaces;

namespace MultiAtendimento.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SetorController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ISetorRepository _setorRepository;
        public SetorController(IMapper mapper, ISetorRepository setorRepository)
        {
            _mapper = mapper;
            _setorRepository = setorRepository;
        }

        [HttpPost("criar")]
        public IActionResult Criar([FromBody] SetorInput setorInput)
        {
            try
            {
                var setor = _mapper.Map<Setor>(setorInput);
                _setorRepository.Criar(setor);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
