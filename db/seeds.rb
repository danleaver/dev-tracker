
projects = [
    { id: 1, name: "No Project" },
    { id: 2, name: "Jim's Bar" },
    { id: 3, name: "Joe's Pickle Factory" },
    { id: 4, name: "Carl's Warehouse" },
  ]
# Clock.create(time_in: Date.parse("2020-07-16"))
projects.map { |project| 
    puts project
    Project.create(project)
  }
Card.create(time_in: Date.parse("2020-07-16"))
