import Link from 'next/link';
import { Team } from '@/features/(dashboard)/types/teams.type';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/atoms/card';
import { Button } from '@/components/molecules/Button';
import { ChevronRight } from 'lucide-react';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const memberCount = team.members?.length || team.memberIds?.length || 0;

  return (
    <Card>
      <CardHeader className="border-b gap-0 py-0 m-0">
        <CardTitle className="font-medium">{team.name}</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>
            {memberCount} {memberCount !== 1 ? 'members' : 'member'}
          </span>

          <Button variant="ghost" size="md">
            <Link href={`/teams/${team.id}`}>View all</Link>
          </Button>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-5">
          {team.members &&
            team.members?.map((member) => (
              <li className="flex items-center justify-between" key={member.id}>
                <Link
                  className="flex items-center justify-between w-full"
                  href={`/staff/${member.id}`}
                >
                  <article>
                    <p>
                      {member.firstName} {member.lastName}
                    </p>
                    <small>{member.role}</small>
                  </article>

                  <ChevronRight size={20} />
                </Link>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
