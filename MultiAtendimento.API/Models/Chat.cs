using MultiAtendimento.API.Models.Enums;

namespace MultiAtendimento.API.Models
{
    public class Chat : BaseModel
    {
        public Guid ChatId { get; } = Guid.NewGuid();
        public Usuario? Atendente { get; set; } = new Usuario();
        public Setor Setor { get; set; } = new Setor();
        public StatusDoChatEnum Status { get; set; }
        public Cliente Cliente { get; set; } = new Cliente();
    }
}
