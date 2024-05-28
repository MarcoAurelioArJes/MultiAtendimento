namespace MultiAtendimento.API.Models
{
    public class Mensagem : BaseModel
    {
        public Chat Chat { get; set; }
        public Usuario Atendente { get; set; }
        public Cliente Cliente { get; set; }
        public Empresa Empresa { get; set; }
        public DateTime DataEHora { get; set; }
        public string Conteudo { get; set; }
    }
}
