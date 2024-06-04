using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Services;
using MultiAtendimento.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace MultiAtendimento.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "ADMIN")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;
        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("criar")]
        public IActionResult Criar([FromBody] UsuarioInput usuarioInput)
        {
            try
            {
                _usuarioService.Criar(usuarioInput);
                return Created();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("Entrar")]
        public IActionResult Entrar([FromBody] EntrarInput entrarInput)
        {
            try
            {
                var retorno = _usuarioService.Entrar(entrarInput);
                return Ok(retorno);
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagemDeErro = ex.Message });
            }
        }

        [HttpPut("atualizar/{id}")]
        public IActionResult Atualizar(string id, [FromBody] UsuarioInput usuarioInput)
        {
            try
            {
                var idInteiro = int.TryParse(id, out int resultado) ? resultado : throw new ArgumentException("Necessário informar no parâmetro da URL um número", nameof(id));
                _usuarioService.Atualizar(idInteiro, usuarioInput);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("obterPorId/{id}")]
        public IActionResult ObterPorId(string id)
        {
            try
            {
                var idInteiro = int.TryParse(id, out int resultado) ? resultado : throw new ArgumentException("Necessário informar no parâmetro da URL um número", nameof(id));
                var usuario = _usuarioService.ObterPorId(idInteiro);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("obterUsuarios")]
        public IActionResult ObterUsuarios()
        {
            try
            {
                var cnpj = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("empresaCnpj")).Value;
                var usuarios = _usuarioService.ObterTodosOsUsuariosPorCnpjDaEmpresa(cnpj);
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
