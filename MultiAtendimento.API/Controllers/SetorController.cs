﻿using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Services;
using MultiAtendimento.API.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Net;
using MultiAtendimento.API.Models;

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
        public IActionResult Atualizar(string id, [FromBody] SetorInput setorInput)
        {
            try
            {
                var idInteiro = int.TryParse(id, out int resultado) ? resultado
                                                                    : throw new ArgumentException("Necessário informar no parâmetro da URL um número", "id");
                _setorService.Atualizar(idInteiro, setorInput);
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

        [HttpGet("obterSetores")]
        public IActionResult Setores()
        {
            try
            {
                var setores = _setorService.ObterTodosOsSetores();
                return Ok(new RetornoPadraoView<List<Setor>>
                {
                    Mensagem = "Lista de setores obtidas com sucesso!",
                    Resultado = setores
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

        [AllowAnonymous]
        [HttpGet("obterSetoresPorCnpj/{cnpj}")]
        public IActionResult ObterSetoresPorCnpj(string cnpj)
        {
            try
            {
                var setores = _setorService.ObterSetoresPorCnpj(cnpj);
                return Ok(new RetornoPadraoView<List<Setor>>
                {
                    Mensagem = "Lista de setores obtidas com sucesso!",
                    Resultado = setores
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
