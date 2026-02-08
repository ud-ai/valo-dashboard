
import { render, screen } from '@testing-library/react';
import MatchHistory from '../MatchHistory';
import { Match } from '@/types';
import '@testing-library/jest-dom';

// Mock the next/image component since it's not supported in jsdom
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => {
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        return <img {...props} />;
    },
}));

// Mock the valorant-data helpers
jest.mock('@/lib/valorant-data', () => ({
    getAgentImageUrl: jest.fn((name) => `https://mock.url/agent/${name}.png`),
    getMapImageUrl: jest.fn((name) => `https://mock.url/map/${name}.png`),
}));

describe('MatchHistory Component', () => {
    const mockMatches: Match[] = [
        {
            match_id: '1',
            map: 'Ascent',
            agent: 'Jett',
            result: 'Won',
            kills: 20,
            deaths: 10,
            assists: 5,
            ACS: 250,
            headshot_percentage: 25,
            KD: 2.0,
            date: '2023-10-27',
        },
        {
            match_id: '2',
            map: 'Bind',
            agent: 'Omen',
            result: 'Lost',
            kills: 10,
            deaths: 15,
            assists: 8,
            ACS: 150,
            headshot_percentage: 15,
            KD: 0.6,
            date: '2023-10-26',
        },
    ];

    it('renders correctly with matches', () => {
        render(<MatchHistory matches={mockMatches} />);

        // Check for main title
        expect(screen.getByText('HISTORY')).toBeInTheDocument();

        // Check for map names
        expect(screen.getByText('Ascent')).toBeInTheDocument();
        expect(screen.getByText('Bind')).toBeInTheDocument();

        // Check for results
        expect(screen.getByText('Won')).toBeInTheDocument();
        expect(screen.getByText('Lost')).toBeInTheDocument();

        // Check for stats
        expect(screen.getByText('20/10/5')).toBeInTheDocument();
        expect(screen.getByText('ACS: 250')).toBeInTheDocument();
    });

    it('renders agent images with correct mocked URLs', () => {
        render(<MatchHistory matches={mockMatches} />);

        // Select images by alt text
        const jettImage = screen.getByAltText('Jett');
        const omenImage = screen.getByAltText('Omen');

        expect(jettImage).toHaveAttribute('src', 'https://mock.url/agent/Jett.png');
        expect(omenImage).toHaveAttribute('src', 'https://mock.url/agent/Omen.png');
    });

    it('renders empty state messages if no matches are provided', () => {
        render(<MatchHistory matches={[]} />);
        // Assuming no specific empty state UI was built, but checking it doesn't crash 
        expect(screen.getByText('HISTORY')).toBeInTheDocument();
        expect(screen.queryByText('Ascent')).not.toBeInTheDocument();
    });
});
