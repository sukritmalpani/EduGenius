'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign, Calendar, Bookmark, ExternalLink } from 'lucide-react';

interface Internship {
  title: string;
  company: string;
  location: string;
  duration: string;
  stipend: string;
  posted_time: string;
  link: string;
}

export default function InternshipsPage() {
  const [internships, setInternships] = useState<Internship[]>([]);

  useEffect(() => {
    // Dummy placeholder
    setInternships([]);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Latest Internship Opportunities
      </h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input placeholder="Search internships..." className="flex-grow" />
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="posted_time">Most Recent</SelectItem>
            <SelectItem value="stipend">Highest Stipend</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((internship) => (
          <Card key={internship.title} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {internship.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{internship.company}</p>
                <p className="flex items-center mb-2"><MapPin className="mr-2" size={16} />{internship.location}</p>
                <p className="flex items-center mb-2"><Clock className="mr-2" size={16} />{internship.duration}</p>
                <p className="flex items-center mb-2"><DollarSign className="mr-2" size={16} />{internship.stipend}</p>
                <p className="flex items-center mb-4 text-sm text-muted-foreground">
                  <Calendar className="mr-2" size={16} />
                  Posted {internship.posted_time}
                </p>
              </div>
              <Button asChild className="flex-grow">
                <a href={internship.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2" size={16} />
                  Apply
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
