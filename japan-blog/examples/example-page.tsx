import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, MapPin, Plane, BookOpen, Tag } from "lucide-react"

export default function Component() {
  const posts = [
    {
      id: 1,
      title: "Week One Summary",
      date: "May 31, 2025",
      excerpt: "Daily life to resume shortly...",
      tags: ["Summary", "Daily Life"],
      category: "summary",
    },
    {
      id: 2,
      title: "Flight to Japan",
      date: "May 26, 2025",
      excerpt: "We made it to Japan! Here is how it went...",
      tags: ["Arrival", "Travel", "Flight"],
      category: "travel",
    },
  ]

  const allTags = ["Arrival", "Daily Life", "Flight", "Summary", "Travel"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50/30">
      {/* Header */}
      <header className="border-b border-stone-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">🇯🇵</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900 tracking-tight">JST Life</h1>
                <p className="text-stone-600 text-sm">Travels and daily life in Japan</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex space-x-6">
                <a href="#" className="text-stone-700 hover:text-stone-900 font-medium transition-colors">
                  Journal
                </a>
                <a href="#" className="text-stone-700 hover:text-stone-900 font-medium transition-colors">
                  About
                </a>
                <a href="#" className="text-stone-700 hover:text-stone-900 font-medium transition-colors">
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Recent Posts Timeline */}
            <Card className="border-stone-200/60 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  Recent Posts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {posts.map((post, index) => (
                  <div key={post.id} className="relative">
                    {index !== posts.length - 1 && (
                      <div className="absolute left-2 top-8 w-px h-16 bg-gradient-to-b from-stone-300 to-transparent" />
                    )}
                    <div className="flex items-start space-x-3">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-stone-900 text-sm leading-tight">{post.title}</h4>
                        <p className="text-xs text-stone-600 mt-1">{post.date}</p>
                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tags Filter */}
            <Card className="border-stone-200/60 shadow-sm bg-white/60 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-amber-600" />
                  Filter by Tag
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200 cursor-pointer transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6 py-12">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full">
                <span className="text-2xl">🇯🇵</span>
                <span className="font-bold text-2xl text-stone-900 tracking-tight">JST Life</span>
                <span className="text-2xl">🇯🇵</span>
              </div>
              <h2 className="text-stone-600 text-lg font-medium max-w-2xl mx-auto">
                Documenting travels and daily life in Japan
              </h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-stone-700 text-lg leading-relaxed">
                  Welcome to my Japan journal! This is where I document my experiences, discoveries, and daily life
                  while living on Japanese Standard Time (JST).
                </p>
              </div>
            </div>

            <Separator className="bg-stone-200" />

            {/* Journal Entries */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-stone-900">Journal Entries</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-stone-300 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="group hover:shadow-lg transition-all duration-300 border-stone-200/60 bg-white/80 backdrop-blur-sm hover:bg-white cursor-pointer"
                  >
                    <CardHeader className="space-y-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">
                          {post.title}
                        </CardTitle>
                        {post.category === "travel" ? (
                          <Plane className="w-5 h-5 text-amber-600" />
                        ) : (
                          <CalendarDays className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-stone-600">
                        <CalendarDays className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-stone-700 leading-relaxed">{post.excerpt}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="bg-stone-200" />

            {/* About Section */}
            <section className="space-y-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-stone-900">About This Journal</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-stone-300 to-transparent" />
              </div>

              <Card className="border-stone-200/60 shadow-sm bg-gradient-to-br from-white to-amber-50/30">
                <CardContent className="p-8">
                  <div className="space-y-4 text-stone-700 leading-relaxed">
                    <p>
                      This journal is built with Next.js and MDX, allowing me to easily create entries using Markdown
                      with rich formatting, images, and more.
                    </p>
                    <p>
                      Browse through entries using the timeline on the left, or click on the recent entries above to
                      read individual posts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200/60 bg-white/60 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span className="text-stone-600 text-sm">Currently in Japan (JST)</span>
            </div>
            <p className="text-stone-500 text-sm">© {new Date().getFullYear()} JST Life. Made with ❤️ in Japan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
