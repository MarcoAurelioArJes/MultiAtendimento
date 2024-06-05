namespace MultiAtendimento.API.Models
{
    public class AtualizarUsuarioInput
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int SetorId { get; set; }
    }
}
