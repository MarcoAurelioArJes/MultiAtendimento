using MultiAtendimento.API.Models.Enums;

namespace MultiAtendimento.API.Models
{
    public class Chat : BaseModel
    {
        public Guid ChatId { get; set; } = Guid.NewGuid();
        public Usuario? Atendente { get; set; }
        public Setor Setor { get; set; }
        public StatusDoChatEnum Status { get; set; }
        public Cliente Cliente { get; set; }
    }
}
