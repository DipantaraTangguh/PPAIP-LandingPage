<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach ($urls as $url)
    <url>
        <loc>{{ $url['location'] }}</loc>
        @if ($url['lastModified'])
        <lastmod>{{ $url['lastModified'] }}</lastmod>
        @endif
        <changefreq>{{ $url['changeFrequency'] }}</changefreq>
        <priority>{{ $url['priority'] }}</priority>
    </url>
@endforeach
</urlset>
