using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Services;
using MultiAtendimento.API.Models.DTOs;

namespace MultiAtendimento.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

        //TO DO
        //REMOVER O PARAMETRO cnpjEmpresa e utilizar a partir das CLAIMS quando for autenticado
        [HttpGet("setores")]
        public IActionResult Setores(string cnpjEmpresa)
        {
            try
            {
                var setores = _setorService.ObterTodosOsSetoresPorEmpresa(cnpjEmpresa);
                return Ok(setores);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
