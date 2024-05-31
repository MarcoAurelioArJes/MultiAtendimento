using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Models;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Services;

namespace MultiAtendimento.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
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


        [HttpGet("detalhes/{id}")]
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

        [HttpGet("usuarios")]
        public IActionResult Usuarios(string cnpj)
        {
            try
            {
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
