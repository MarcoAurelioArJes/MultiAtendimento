using MultiAtendimento.API.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using MultiAtendimento.API.Repository;
using MultiAtendimento.API.Models.DTOs;
using MultiAtendimento.API.Models.Enums;
using MultiAtendimento.API.Repository.BancoDeDados;
using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Services;
using System;

namespace MultiAtendimento.API.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ListaDeChatsTemporaria _listaDeChatsTemporaria;
        private readonly ClienteService _clienteService;
        private readonly ChatService _chatService;

        public ChatHub(ListaDeChatsTemporaria listaDeChatsTemporaria, ClienteService clienteService, ChatService chatService)
        {
            _listaDeChatsTemporaria = listaDeChatsTemporaria;
            _clienteService = clienteService;
            _chatService = chatService;
        }

        public async Task IniciarChat(ClienteInput clienteInput)
        {
            var clienteCriado = _clienteService.Criar(clienteInput);

            var chat = _chatService.Criar(clienteCriado);

            await Groups.AddToGroupAsync(Context.ConnectionId, chat.ChatId.ToString());

            _listaDeChatsTemporaria.Chats[Context.ConnectionId] = chat;

            await Clients.Group($"{chat.Setor.Empresa.Cnpj}_{chat.Setor.Nome}").SendAsync("ChatCriado", chat);
        }

        public async Task VincularAUmGrupoDeChats(SetorInput setor)
        {
            //var chats = _contextoDoBancoDeDados.Chats
            //                                   .Include(c => c.Setor)
            //                                   .Where(c => c.Status == StatusDoChatEnum.Nenhum
            //                                            && c.Setor.Nome.ToLower().Equals(setor.Nome.ToLower())
            //                                            && c.Setor.Empresa.Cnpj.Equals(setor.CnpjEmpresa));

            //await Clients.Caller.SendAsync("VinculadoAoChat", chats);
            //await Groups.AddToGroupAsync(Context.ConnectionId, $"{chat.Setor.Empresa.Cnpj}_{chat.Setor.Nome}");
        }
    }
}
