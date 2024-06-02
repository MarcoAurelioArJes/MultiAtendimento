namespace MultiAtendimento.API.Models.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        void Criar(T objeto);
        T Atualizar(T objeto);
        T ObterPorId(int id);
        List<T> ObterTodosPorCnpjDaEmpresa(string cnpjDaEmpresa);
    }
}
