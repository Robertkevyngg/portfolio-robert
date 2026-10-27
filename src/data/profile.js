// ============================================================
//  DADOS DO PORTFÓLIO — edite este arquivo, não os componentes
// ============================================================

export const profile = {
  nome: 'Robert Gomes',
  handle: 'Robertkevyngg',
  cargo: 'Ciência da Computação · IMT',
  // Selo acima do nome, no topo
  selo: 'estagiando em automação industrial · Baumier',
  estagio: { empresa: 'Baumier Automation', area: 'Automação Industrial' },
  local: 'Diadema, São Paulo — Brasil',
  localCurto: 'Diadema, SP',
  curso: 'Ciência da Computação — IMT',
  desde: 2024,
  foco: ['software', 'segurança', 'dados'],
  email: 'robertkevyn160406@gmail.com',
  // WhatsApp: só dígitos, com código do país (55) + DDD + número
  whatsapp: '5511947442519',
  whatsappExibicao: '(11) 94744-2519',
  whatsappMensagem: 'Olá, Robert! Vi seu portfólio e queria conversar.',
  github: 'https://github.com/Robertkevyngg',
  linkedin: 'https://www.linkedin.com/in/robert-gomes-2539343ba',
  bio: `Estudante de Ciência da Computação no Instituto Mauá de Tecnologia, com foco em
desenvolvimento de software, cibersegurança e análise de dados. Desde 2024 construo
experiência prática em projetos reais e acadêmicos — do site institucional de uma escola
a um sistema de detecção de intrusão com machine learning. Hoje estagio na área de
automação industrial na Baumier.`,
  bioCurta:
    'Construo software que resolve problema real — do front-end ao modelo que roda por trás.',
  // Malha do diagrama do topo: campo → rede → proteção → dados
  malha: [
    { tag: 'FE', numero: '101', nome: 'Campo', detalhe: 'Python · Modbus TCP' },
    { tag: 'SW', numero: '201', nome: 'Rede', detalhe: 'Linux · SSH · Raspberry Pi' },
    { tag: 'FW', numero: '301', nome: 'Proteção', detalhe: 'Cibersegurança · Nmap' },
    { tag: 'DL', numero: '401', nome: 'Dados', detalhe: 'React · ML · dashboards' },
  ],
  // `valor: null` em repositórios públicos = número vem ao vivo da API do GitHub
  destaques: [
    { valor: null, label: 'repositórios públicos' },
    { valor: '2024', label: 'primeiro commit' },
    { valor: '8', label: 'certificações' },
    { valor: '2', label: 'sites entregues p/ clientes' },
  ],
}

// ---------------------------------------------------------------
// STACK — grupos exibidos na seção de tecnologias
// ---------------------------------------------------------------
export const stack = [
  {
    grupo: 'Linguagens',
    itens: ['Python', 'Java', 'JavaScript', 'C / C++', 'SQL', 'R', 'Scala', 'Haskell'],
  },
  {
    grupo: 'Front-end',
    itens: ['React', 'Vite', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind'],
  },
  {
    grupo: 'Back-end & Dados',
    itens: ['Flask', 'FastAPI', 'Node.js', 'MySQL', 'MongoDB', 'pandas', 'NumPy', 'scikit-learn'],
  },
  {
    grupo: 'Automação & IIoT',
    itens: ['Modbus TCP', 'Raspberry Pi', 'Debian', 'SSH', 'systemd'],
  },
  {
    grupo: 'Infra & Segurança',
    itens: ['AWS', 'Docker', 'Linux', 'Kali Linux', 'Git / GitHub', 'Nmap'],
  },
]

// ---------------------------------------------------------------
// PROJETOS EM DESTAQUE
// `repo` liga o card ao repositório real (stars/linguagem vêm da API)
// `privado: true` para projetos que não estão no GitHub
// ---------------------------------------------------------------
export const destaques = [
  {
    id: 'ia-teste',
    titulo: 'IA Teste — IDS de rede com Machine Learning',
    repo: 'IA-Teste',
    ano: '2026',
    tipo: 'Cibersegurança + ML',
    resumo:
      'Sistema de detecção de intrusão em duas camadas: um classificador supervisionado (LightGBM) que identifica qual ataque está acontecendo e um autoencoder treinado só em tráfego benigno que sinaliza o que nunca foi visto.',
    detalhes: [
      'Dataset CIC-IDS2017 em versão corrigida, com split temporal (não aleatório) para evitar vazamento',
      'Otimiza taxa de falso positivo, não acurácia — em IDS, 99% de acurácia é o baseline trivial',
      'Validação em tráfego próprio: VM Kali atacando VM Ubuntu com nmap, hydra e slowloris',
      'Servido por API FastAPI com endpoints /predict e /stream',
    ],
    tags: ['Python', 'LightGBM', 'PyTorch', 'FastAPI', 'SHAP', 'Docker'],
    status: 'em desenvolvimento',
  },
  {
    id: 'semeador',
    titulo: 'Site Institucional — Escola Metodista O Semeador',
    repo: 'Site-PI',
    ano: '2024',
    tipo: 'Cliente real',
    resumo:
      'Site institucional completo desenvolvido para a escola: front-end do zero e integração de todo o conteúdo, do calendário acadêmico à área de comunicados.',
    detalhes: [
      'Front-end em HTML, CSS e JavaScript, sem dependência de framework',
      'Estrutura de conteúdo pensada para a equipe da escola conseguir atualizar',
      'Projeto Integrador levado até a entrega ao cliente',
    ],
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'arquitetura',
    titulo: 'Estúdio Arquitetura — Portfólio Editorial',
    repo: 'Teste-de-site-para-arquitetura-',
    ano: '2026',
    tipo: 'Front-end',
    resumo:
      'Site portfólio para estúdio de arquitetura, estático e sem build, com painel de administração próprio para o cliente gerenciar os projetos sem tocar em código.',
    detalhes: [
      'Filtros por categoria, lightbox navegável por teclado e nav com glassmorphism',
      'Editor visual em /admin.html que gera o JSON de conteúdo',
      'Acessível: WAI-ARIA, navegação por teclado e respeito a prefers-reduced-motion',
      'Design construído sobre leis de UX (Jakob, Hick, Fitts, Von Restorff)',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'UX'],
  },
  {
    id: 'quiz',
    titulo: 'Quiz Citologia — Flask + MySQL',
    repo: 'quiz_citologia',
    ano: '2026',
    tipo: 'Full-stack',
    resumo:
      'Plataforma de quiz educacional com autenticação, banco de 50 questões, sorteio aleatório por rodada, limite de erros e histórico completo de sessões.',
    detalhes: [
      'Senhas com hash PBKDF2-SHA256 e queries parametrizadas contra SQL injection',
      'Quatro tabelas relacionais: usuários, questões, sessões e respostas',
      'Tela de revisão pós-rodada mostrando cada erro com a resposta correta',
    ],
    tags: ['Python', 'Flask', 'MySQL', 'Bootstrap'],
  },
  {
    id: 'placar-bjj',
    titulo: 'Placar de Jiu-Jitsu — App Desktop',
    privado: true,
    ano: '2025',
    tipo: 'Desktop',
    resumo:
      'Aplicativo desktop em Electron feito para o CT Rogério Taz, implementando as regras de pontuação da IBJJF para uso em campeonatos internos.',
    detalhes: [
      'Pontuação, vantagens, punições e cronômetro seguindo o regulamento IBJJF',
      'Interface de tela cheia pensada para projeção durante as lutas',
    ],
    tags: ['Electron', 'JavaScript', 'Node.js'],
  },
  {
    id: 'universal-auto',
    titulo: 'Universal Auto Imports — Automação de Catálogo',
    privado: true,
    ano: '2024 — hoje',
    tipo: 'Automação',
    resumo:
      'E-commerce próprio de autopeças na Amazon Brasil e no Mercado Livre, com automação da criação de anúncios via flat file da Amazon Seller.',
    detalhes: [
      'Geração automática das planilhas flat file a partir do catálogo',
      'Reduz para minutos um cadastro que era feito anúncio por anúncio',
    ],
    tags: ['Python', 'Automação', 'E-commerce'],
  },
]

// ---------------------------------------------------------------
// CERTIFICAÇÕES
// ---------------------------------------------------------------
export const certificacoes = [
  {
    nome: 'Java Foundations Associate',
    emissor: 'Oracle',
    area: 'Programação',
  },
  {
    nome: 'AWS Academy Graduate — Data Engineering',
    emissor: 'Amazon Web Services',
    area: 'Cloud & Dados',
  },
  {
    nome: 'AWS Academy — Cloud Operations',
    emissor: 'Amazon Web Services',
    area: 'Cloud',
    status: 'em andamento',
  },
  {
    nome: 'Web Development Fundamentals',
    emissor: 'IBM SkillsBuild',
    area: 'Front-end',
  },
  {
    nome: 'Cloud Computing Fundamentals',
    emissor: 'IBM SkillsBuild',
    area: 'Cloud',
  },
  {
    nome: 'Projeto Completo em Python com Estruturas de Dados',
    emissor: 'IBM SkillsBuild',
    area: 'Programação',
  },
  {
    nome: 'Linguagem de Programação Python — Básico',
    emissor: 'Fundação Bradesco',
    area: 'Programação',
  },
  {
    nome: 'Criação de Sites',
    emissor: 'Fundação Bradesco',
    area: 'Front-end',
  },
]

// ---------------------------------------------------------------
// TRAJETÓRIA
// ---------------------------------------------------------------
export const trajetoria = [
  {
    periodo: '2026 —',
    titulo: 'Estágio em Automação Industrial',
    onde: 'Baumier',
    texto:
      'Datalogger Modbus TCP em Python com dashboard web, Raspberry Pi preparado para campo (SSH, watchdog, imagem do sistema) e estação Debian com a identidade da empresa.',
  },
  {
    periodo: '2026 —',
    titulo: 'IA Teste — IDS com Machine Learning',
    onde: 'Projeto próprio',
    texto:
      'Projeto na interseção de IA e cibersegurança: detecção de intrusão em duas camadas, validada em dataset público e em laboratório próprio.',
  },
  {
    periodo: '2026',
    titulo: 'AWS Academy — Cloud Operations',
    onde: 'Instituto Mauá de Tecnologia',
    texto:
      'Labs práticos de EC2, EBS, snapshots e operação de infraestrutura na AWS, somados à formação anterior em Data Engineering.',
  },
  {
    periodo: '2024 —',
    titulo: 'Universal Auto Imports',
    onde: 'Negócio próprio',
    texto:
      'E-commerce de autopeças na Amazon Brasil e no Mercado Livre, com automação do cadastro de produtos.',
  },
  {
    periodo: '2024 —',
    titulo: 'Sites para clientes',
    onde: 'Freelance',
    texto:
      'Site institucional da Escola Metodista O Semeador e quiz educacional para a Escola Piaget, do front-end à entrega.',
  },
  {
    periodo: '2024 —',
    titulo: 'Bacharelado em Ciência da Computação',
    onde: 'Instituto Mauá de Tecnologia (IMT)',
    texto:
      'Algoritmos e estruturas de dados, linguagens de programação (R, Scala, Haskell, C, C++), cálculo, física computacional e banco de dados.',
  },
]

// ---------------------------------------------------------------
// ESTÁGIO — Baumier Automation
// Imagens em public/baumier/
// ---------------------------------------------------------------
export const baumier = {
  empresa: 'Baumier Automation',
  periodo: '2026 —',
  sobre:
    'Distribuidora autorizada de soluções para redes industriais, cibersegurança e IIoT, com suporte técnico certificado pelos fabricantes. A proposta é coletar, tratar e entregar os dados da indústria com segurança — do chão de fábrica à nuvem, integrando TI e TO.',
  numeros: [
    { valor: '2005', label: 'ano de fundação' },
    { valor: 'ABC', label: 'sede em São Bernardo do Campo' },
    { valor: '20+', label: 'fabricantes representados' },
  ],
  projetos: [
    {
      id: 'datalogger',
      titulo: 'Datalogger Modbus TCP com dashboard web',
      tipo: 'Python · Modbus TCP',
      resumo:
        'Teste completo de comunicação industrial: um escravo simulado faz o papel do equipamento de campo, um mestre em Python lê os registradores continuamente e um painel web mostra tudo em tempo real.',
      etapas: [
        {
          rotulo: 'escravo',
          texto: 'Dispositivo simulado com 10 holding registers (0 a 9) na porta 5020.',
        },
        {
          rotulo: 'mestre',
          texto:
            'Datalogger que lê os registradores e grava em CSV a cada 1 min, um arquivo por dia.',
        },
        {
          rotulo: 'monitoramento',
          texto:
            'Dashboard com gráfico por registrador (mín., média e máx.) e status da comunicação.',
        },
      ],
      resultados: [
        { valor: '92 / 0', label: 'leituras / falhas' },
        { valor: '10', label: 'registradores monitorados' },
        { valor: '≈ 84 KB', label: 'de CSV por dia' },
      ],
      imagem: {
        src: 'baumier/dashboard-datalogger.webp',
        largura: 1200,
        altura: 1192,
        alt: 'Dashboard do datalogger Modbus: dez gráficos de holding registers, status "Comunicando", 92 leituras e 0 falhas, gravação em CSV a cada 1 minuto.',
      },
      tags: ['Python', 'Modbus TCP', 'CSV', 'Dashboard web'],
    },
    {
      id: 'raspberry',
      titulo: 'Raspberry Pi preparado para campo',
      tipo: 'Linux embarcado',
      resumo:
        'Configuração de um Raspberry Pi para operar sem monitor nem teclado, com recuperação automática e backup completo do sistema.',
      itens: [
        ['Acesso via SSH', 'terminal do Raspberry aberto pelo notebook, pela rede'],
        ['VS Code Remote-SSH', 'edito no notebook, o código executa no Raspberry'],
        ['Watchdog', 'reinicia o sistema sozinho se ele travar em campo'],
        ['Datalogger', 'coleta e grava dados periodicamente, com data e hora'],
        ['Imagem com dd', 'cópia bit a bit do cartão SD para restaurar ou clonar'],
        ['Compactação', 'gzip e tar para guardar e transferir o backup'],
      ],
      tags: ['Raspberry Pi', 'Linux', 'SSH', 'systemd', 'Bash'],
    },
    {
      id: 'debian',
      titulo: 'Estação Debian com a identidade Baumier',
      tipo: 'Linux · personalização',
      resumo:
        'Debian 13 (trixie) com GNOME 48.7 personalizado com a marca da empresa: papel de parede, logo na barra superior, dock com os apps do dia a dia e terminal que abre com o logo em ASCII e o resumo do sistema.',
      itens: [
        ['Área de trabalho', 'papel de parede, logo na barra e dock centralizado'],
        ['Terminal', 'logo BAUMIER Autom@tion em ASCII nas cores da marca'],
        ['Resumo do sistema', 'SO, kernel 6.12, GNOME, memória, disco e IP ao abrir'],
        ['Prompt', 'usuário e prompt personalizados: baumier_guest@Guest'],
      ],
      imagem: {
        src: 'baumier/debian-terminal.webp',
        largura: 1400,
        altura: 785,
        alt: 'Área de trabalho do Debian com papel de parede da Baumier Automation e terminal mostrando o logo BAUMIER em ASCII e o resumo do sistema.',
      },
      tags: ['Debian 13', 'GNOME', 'Bash', 'Branding'],
    },
  ],
  // Comandos usados no Raspberry Pi
  comandos: [
    { tarefa: 'Acesso remoto', cmd: 'ssh usuario@IP-do-raspberry' },
    { tarefa: 'Copiar arquivos', cmd: 'scp usuario@IP-do-raspberry:~/backup.img.gz .' },
    { tarefa: 'Watchdog', cmd: 'sudo systemctl status watchdog' },
    { tarefa: 'Conferir o disco', cmd: 'lsblk' },
    { tarefa: 'Criar imagem', cmd: 'sudo dd if=/dev/mmcblk0 of=backup.img bs=4M status=progress' },
    { tarefa: 'Compactar', cmd: 'gzip backup.img && tar -czvf logs.tar.gz logs/' },
    { tarefa: 'Descompactar', cmd: 'gunzip backup.img.gz && tar -xzvf logs.tar.gz' },
  ],
  avisoComandos:
    'Cuidado com o dd: um destino errado (of=) apaga o disco. Confira sempre o dispositivo com lsblk antes.',
  aprendizados: [
    {
      titulo: 'Convergência TI–TO',
      texto:
        'Fábrica e escritório passam a falar o mesmo TCP/IP — e o chão de fábrica fica exposto a riscos que antes eram só da TI.',
    },
    {
      titulo: 'Segurança em OT',
      texto:
        'Infraestrutura crítica precisa de segmentação, controle de acesso e detecção de ameaças sem parar a produção.',
    },
    {
      titulo: 'Protocolos industriais',
      texto:
        'Modbus na prática; PROFINET, OPC UA e MQTT como a forma de CLPs, sensores e nuvem conversarem.',
    },
    {
      titulo: 'Hardware de padrão industrial',
      texto:
        'PC de escritório não aguenta a fábrica: PC industrial opera de −20 °C a +70 °C, sem ventoinha, em trilho DIN e com certificação ATEX.',
    },
    {
      titulo: 'Equipamento em campo se recupera sozinho',
      texto:
        'Sem ninguém por perto, watchdog, acesso remoto e imagem de backup são o que mantém o sistema de pé.',
    },
    {
      titulo: 'Dado só vale com contexto',
      texto:
        'Gravar com data e hora, projetar quanto o arquivo cresce e mostrar o status da comunicação é o que torna o log útil.',
    },
  ],
}

// Repositórios que não devem aparecer na grade vinda do GitHub
export const reposOcultos = ['Robertkevyngg', 'test_aula']

// Descrições para repositórios que estão sem description no GitHub.
// (O ideal é preencher a descrição no próprio GitHub — aqui é o plano B.)
export const descricoesRepos = {
  Cell_questao_final: 'Questão final do projeto de citologia em Python — versão entregue.',
  'cell-quest-': 'Primeira versão do quiz de citologia, em Python puro no terminal.',
  'java-': 'Exercícios de lógica e estruturas de dados em Java.',
  'java-exercicios-novos-': 'Segunda rodada de exercícios em Java, com foco em POO.',
  Aulas_Python: 'Cadernos Jupyter das aulas de Python — NumPy, Matplotlib e análise de dados.',
  'Aulas-python': 'Cadernos Jupyter de Python com exercícios de cálculo e física computacional.',
  Mongo: 'Experimentos com MongoDB: modelagem de documentos e queries em Node.js.',
  localbase: 'Testes de persistência local no navegador com Localbase (IndexedDB).',
  'React-test-': 'Laboratório de React: componentes, estado e efeitos.',
  'Novo-Site-react-fundo-animado-': 'Site em React com fundo animado em canvas.',
  'Front-end_html_css_Js':
    'Fundamentos de front-end: HTML semântico, CSS e JavaScript sem framework.',
  't1-front-end': 'Página responsiva construída com Bootstrap — trabalho 1 de front-end.',
  login: 'Tela de login com validação e interface própria.',
  'IA-Teste': 'IDS de rede em duas camadas: LightGBM supervisionado + autoencoder para anomalias.',
  'Atividade-algoritmos-': 'Análise comparativa de algoritmos de ordenação e busca.',
  'Site-PI':
    'Site institucional da Escola Metodista O Semeador — projeto integrador entregue ao cliente.',
  quiz_citologia: 'Quiz educacional em Flask com login, banco MySQL e histórico de rodadas.',
  'Teste-de-site-para-arquitetura-':
    'Portfólio para estúdio de arquitetura, com painel de administração próprio.',
}
