using System.Net;
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
            catch (BadHttpRequestException badHttpRequestException)
            {
                return StatusCode(badHttpRequestException.StatusCode, new RetornoPadraoView<object>
                {
                    Mensagem = badHttpRequestException.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new RetornoPadraoView<object>
                {
                    Mensagem = ex.Message
                });
            }
        }

        [AllowAnonymous]
        [HttpPost("entrar")]
        public IActionResult Entrar([FromBody] EntrarInput entrarInput)
        {
            try
            {
                var retorno = _usuarioService.Entrar(entrarInput);
                return Ok(new RetornoPadraoView<EntrarView>
                {
                    Mensagem = "Login efetuado com sucesso!",
                    Resultado = retorno
                });
            }
            catch (BadHttpRequestException badHttpRequestException)
            {
                return StatusCode(badHttpRequestException.StatusCode, new RetornoPadraoView<object>
                {
                    Mensagem = badHttpRequestException.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new RetornoPadraoView<object>
                {
                    Mensagem = ex.Message
                });
            }
        }

        [HttpPut("atualizar/{id}")]
        public IActionResult Atualizar(string id, [FromBody] AtualizarUsuarioInput usuarioInput)
        {
            try
            {
                var idInteiro = int.TryParse(id, out int resultado) ? resultado : throw new ArgumentException("Necessário informar no parâmetro da URL um número", nameof(id));
                _usuarioService.Atualizar(idInteiro, usuarioInput);
                return NoContent();
            }
            catch (BadHttpRequestException badHttpRequestException)
            {
                return StatusCode(badHttpRequestException.StatusCode, new RetornoPadraoView<object>
                {
                    Mensagem = badHttpRequestException.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new RetornoPadraoView<object>
                {
                    Mensagem = ex.Message
                });
            }
        }


        [HttpGet("obterPorId/{id}")]
        public IActionResult ObterPorId(string id)
        {
            try
            {
                var idInteiro = int.TryParse(id, out int resultado) ? resultado : throw new ArgumentException("Necessário informar no parâmetro da URL um número", nameof(id));
                var usuario = _usuarioService.ObterPorId(idInteiro);
                return Ok(new RetornoPadraoView<Usuario>
                {
                    Mensagem = "Usuário obtido com sucesso!",
                    Resultado = usuario
                });
            }
            catch (BadHttpRequestException badHttpRequestException)
            {
                return StatusCode(badHttpRequestException.StatusCode, new RetornoPadraoView<object>
                {
                    Mensagem = badHttpRequestException.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new RetornoPadraoView<object>
                {
                    Mensagem = ex.Message
                });
            }
        }

        [HttpGet("obterUsuarios")]
        public IActionResult ObterUsuarios()
        {
            try
            {
                var cnpj = HttpContext.User.Claims.FirstOrDefault(c => c.Type.Equals("empresaCnpj")).Value;
                var usuarios = _usuarioService.ObterTodosOsUsuariosPorCnpjDaEmpresa(cnpj);
                return Ok(new RetornoPadraoView<List<Usuario>>
                {
                    Mensagem = "Lista chats de usuário obtidas com sucesso!",
                    Resultado = usuarios
                });
            }
            catch (BadHttpRequestException badHttpRequestException)
            {
                return StatusCode(badHttpRequestException.StatusCode, new RetornoPadraoView<object>
                {
                    Mensagem = badHttpRequestException.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.BadRequest, new RetornoPadraoView<object>
                {
                    Mensagem = ex.Message
                });
            }
        }
    }
}
