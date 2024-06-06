using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MultiAtendimento.API.Services;

namespace MultiAtendimento.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly ChatService _chatService;
        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet("obterChatsDoUsuario")]
        public IActionResult ObterChatsDoUsuario()
        {
            try
            {
                var idUsuario = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "id").Value;
                var chats = _chatService.ObterChatsDoUsuarioLogado(int.TryParse(idUsuario, out int resultado) ? resultado : 0);
                return Ok(chats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
