import {
  Injectable,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements OnModuleInit {
  // Mock users database - in production this would be a real database
  private readonly mockUsers: any[] = [];

  constructor(private jwtService: JwtService) {}

  // Automatically seed admin user
  async onModuleInit() {
    const hashed = await bcrypt.hash('password123', 10);
    this.mockUsers.push({
      id: '1',
      name: 'Admin User',
      email: 'admin@mo-marketplace.com',
      password: hashed,
    });
    console.log('Admin user created with email: admin@mo-marketplace.com');
    console.log('Password: password123');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = this.mockUsers.find((u) => u.email === email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async getProfile(userId: string) {
    const user = this.mockUsers.find((u) => u.id === userId);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async createTestUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    };

    this.mockUsers.push(newUser);

    const { password: _, ...result } = newUser;
    return result;
  }
}
