using MultiAtendimento.API.Models.Interfaces;
using MultiAtendimento.API.Repository;
using MultiAtendimento.API.Repository.BancoDeDados;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ContextoDoBancoDeDados>();
// Add services to the container.
builder.Services.AddSignalR();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<ListaDeChatsTemporaria>();
builder.Services.AddScoped<ISetorRepository, SetorRepository>();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();