namespace MultiAtendimento.API.Models
{
    public class Mensagem : BaseModel
    {
        public Chat Chat { get; set; } = new Chat();
        public Usuario Atendente { get; set; } = new Usuario();
        public Cliente Cliente { get; set; } = new Cliente();
        public DateTime DataEHora { get; set; }
        public string Conteudo { get; set; }
    }
}
