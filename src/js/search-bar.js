const client  = algoliasearch('4KRGXPTF7K', '4594f3b07157188f25b3f5a8a7eba04e')
const guides  = client.initIndex('guides_production');
const courses = client.initIndex('courses_production');
const posts   = client.initIndex('posts_production');
const options = { 
  hitsPerPage: 10, 
  distinct: 5,
  facetFilters: ['status:published']
};

autocomplete('#aa-search-input', {
  // debug: true,
  openOnFocus: true,
  keyboardShortcuts: ['s', '/'],
  templates: {
    dropdownMenu:
      `
      <div class="aa-dataset-container">
        <div class="aa-dataset-column">
          <div class="aa-dataset-guides"></div>
          <div class="aa-dataset-courses"></div> 
        </div>
        <div class="aa-dataset-column">
          <div class="aa-dataset-posts"></div>
        </div>
      </div>
      `
    }
  }, [
  {
    source: autocomplete.sources.hits(guides, options),
    displayKey: 'name',
    name: 'guides',
    templates: {
      header: '<div class="aa-suggestions-header aa-suggestions-category">Guides</div>',
      suggestion: (suggestion) => `<span>${suggestion._highlightResult.title.value}</span>`,
      empty: '<div class="aa-empty">No matching guides</div>'
    }
  },
  {
    source: autocomplete.sources.hits(courses, options),
    displayKey: 'name',
    name: 'courses',
    templates: {
      header: '<div class="aa-suggestions-header aa-suggestions-category">Courses</div>',
      suggestion: (suggestion) => `<span>${suggestion._highlightResult.title.value}</span>`,
      empty: '<div class="aa-empty">No matching courses</div>'
    }
  },
  {
    source: autocomplete.sources.hits(posts, options),
    displayKey: 'name',
    name: 'posts',
    templates: {
      header: '<div class="aa-suggestions-header aa-suggestions-category">Posts</div>',
      suggestion: (suggestion) => `<span>${suggestion._highlightResult.title.value}</span>`,
      empty: '<div class="aa-empty">No matching posts</div>'
    }
  }
])
  .on('autocomplete:selected', (event, suggestion, dataset) => {
    let url;

    if (dataset === 'guides')
      url = `https://school.scotch.io/guides/${suggestion.slug}`;
    else if (dataset === 'courses')
      url = `https://school.scotch.io/courses/${suggestion.slug}`;
    else if (dataset === 'posts')
      url = suggestion.published_url; 

    window.location.href = url;
  });