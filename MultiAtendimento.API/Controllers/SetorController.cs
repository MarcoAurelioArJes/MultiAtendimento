using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Services;
using MultiAtendimento.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace MultiAtendimento.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "ADMIN")]
    public class SetorController : ControllerBase
    {
        private readonly SetorService _setorService;
        public SetorController(SetorService setorService)
        {
            _setorService = setorService;
        }

        [HttpPost("criar")]
        public IActionResult Criar([FromBody] SetorInput setorInput)
        {
            try
            {
                _setorService.Criar(setorInput);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("atualizar/{id}")]
        public IActionResult Atualizar(string id, [FromBody] SetorInput setorInput)
        {
            try
            {
                var idInteiro = int.TryParse(id, out int resultado) ? resultado
                                                                    : throw new ArgumentException("Necessário informar no parâmetro da URL um número", "id");
                _setorService.Atualizar(idInteiro, setorInput);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("setores")]
        public IActionResult Setores()
        {
            try
            {
                var setores = _setorService.ObterTodosOsSetores();
                return Ok(setores);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
