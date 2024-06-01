using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Services;

namespace MultiAtendimento.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmpresaController : ControllerBase
    {
        private readonly EmpresaService _empresaService;
        public EmpresaController(EmpresaService empresaService) 
        {
            _empresaService = empresaService;
        }

        [HttpPost("Registrar")]
        public IActionResult Registrar([FromBody] CadastroEmpresaInput primeiroCadastroInput)
        {
            try
            {
                _empresaService.Criar(primeiroCadastroInput);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
