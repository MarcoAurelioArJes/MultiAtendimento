using MultiAtendimento.API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MultiAtendimento.API.Repositorio;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Enums;
using MultiAtendimento.API.Repositorio.BancoDeDados;

namespace MultiAtendimento.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ListaDeChatsTemporaria _listaDeChatsTemporaria;
        private readonly ContextoDoBancoDeDados _contextoDoBancoDeDados;

        public ChatHub(ListaDeChatsTemporaria listaDeChatsTemporaria, ContextoDoBancoDeDados contextoDoBancoDeDados)
        {
            _listaDeChatsTemporaria = listaDeChatsTemporaria;
            _contextoDoBancoDeDados = contextoDoBancoDeDados;
        }

        public async Task VincularAUmSetor(SetorInput setor)
        {
            var chats = _contextoDoBancoDeDados.Chats
                                               .Include(c => c.Setor)
                                               .Where(c => c.Status == StatusDoChatEnum.Nenhum
                                                        && c.Setor.Nome.ToLower().Equals(setor.Nome.ToLower())
                                                        && c.Setor.Empresa.Cnpj.Equals(setor.CnpjEmpresa));

            await Clients.Caller.SendAsync("VinculadoAoChat", chats);
            await Groups.AddToGroupAsync(Context.ConnectionId, $"{setor.CnpjEmpresa}_{setor.Nome}");
        }

        public async Task IniciarChat(ClienteInput clienteInput)
        {
            var setor = _contextoDoBancoDeDados.Setores
                                   .Include(c => c.Empresa)
                                   .FirstOrDefault(c => c.Id == clienteInput.SetorId 
                                                     && c.Empresa.Cnpj.Equals(clienteInput.CnpjEmpresa));
            
            var cliente = new Cliente
            {
                Nome = clienteInput.Nome,
                Empresa = setor.Empresa,
                Setor = setor,
                DataCadastro = DateTime.Now
            };

            _contextoDoBancoDeDados.Clientes.Add(cliente);
            _contextoDoBancoDeDados.SaveChanges();

            var clienteDb = _contextoDoBancoDeDados.Clientes
                                                   .Include(c => c.Empresa)
                                                   .Include(c => c.Setor)
                                                   .FirstOrDefault(c => c.DataCadastro.Equals(cliente.DataCadastro));

            var chat = new Chat
            {
                Atendente = null,
                Setor = setor,
                Cliente = clienteDb,
                Status = StatusDoChatEnum.Nenhum,
                Empresa = clienteDb.Empresa
            };

            _contextoDoBancoDeDados.Chats.Add(chat);
            _contextoDoBancoDeDados.SaveChanges();

            await Groups.AddToGroupAsync(Context.ConnectionId, chat.ChatId.ToString());

            _listaDeChatsTemporaria.Chats[Context.ConnectionId] = chat;

            await Clients.Group(chat.Setor.Nome).SendAsync("ChatCriado", chat);
        }
    }
}
