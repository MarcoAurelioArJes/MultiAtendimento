namespace MultiAtendimento.API.Models.Interfaces
{
    public interface IChatRepository : IBaseRepository<Chat>
    {
        void AdicionarMensagem(Mensagem mensagem);
        List<Chat> ObterChatsDoUsuario(int idUsuario);
    }
}
