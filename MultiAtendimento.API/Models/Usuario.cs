namespace MultiAtendimento.API.Models
{
    public class Usuario : BaseModel
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public Setor Setor { get; set; }
        public Cargo Cargo { get; set; }
    }
}
