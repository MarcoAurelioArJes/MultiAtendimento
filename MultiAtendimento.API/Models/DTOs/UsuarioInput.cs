namespace MultiAtendimento.API.Models
{
    public class UsuarioInput
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int? Setor{ get; set; }
    }
}
