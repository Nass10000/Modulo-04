import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { hash } from 'bcryptjs';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'User 1',
      email: 'u1@mail.com',
      password: 'pass',
      address: '',
      city: '',
      country: '',
      phone: 0,
      orders: [],
      isAdmin: false,
    },
    {
      id: '2',
      name: 'User 2',
      email: 'u2@mail.com',
      password: 'pass',
      address: '',
      city: '',
      country: '',
      phone: 0,
      orders: [],
      isAdmin: false,
    },
  ];

  const mockUsersRepo = {
    find: jest.fn().mockResolvedValue(
      mockUsers.map(({ password, ...rest }) => rest),
    ),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({ id: 'mock-id', ...user }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepo,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  afterEach(() => jest.clearAllMocks());

  it('debe devolver una lista de usuarios', async () => {
    const result = await service.getUsers(1, 5);
    expect(result).toEqual(
      mockUsers.map(({ password, ...rest }) => rest),
    );
    expect(usersRepository.find).toHaveBeenCalled();
  });

  it('debe crear un nuevo usuario', async () => {
    const dto: CreateUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!',
      address: 'Dirección',
      city: 'Ciudad',
      country: 'País',
      phone: 8095551234,
      isAdmin: false,
    };

    const result = await service.createUser(dto);
    expect(result).toHaveProperty('id', 'mock-id');
    expect(usersRepository.create).toHaveBeenCalled();
    expect(usersRepository.save).toHaveBeenCalled();
  });
});
