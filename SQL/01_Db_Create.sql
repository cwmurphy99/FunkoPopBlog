CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DisplayName] nvarchar(255) NOT NULL,
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [Image] nvarchar(255),
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [IsActive] bit NOT NULL DEFAULT (1)
)
GO

CREATE TABLE [FunkoPop] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Handle] nvarchar(255) NOT NULL,
  [Image] nvarchar(255) NOT NULL,
  [Title] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Series] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserProfileFunkoPop] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserProfileId] int NOT NULL,
  [FunkoPopId] int NOT NULL
)
GO

CREATE TABLE [BlogPost] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Content] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [UserProfileId] int NOT NULL,
  [FunkoPopId] int
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BlogPostId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [Content] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [FunkoPopSeries] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SeriesId] int NOT NULL,
  [FunkoPopId] int NOT NULL
)
GO

ALTER TABLE [UserProfileFunkoPop] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [BlogPost] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([BlogPostId]) REFERENCES [BlogPost] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserProfileFunkoPop] ADD FOREIGN KEY ([FunkoPopId]) REFERENCES [FunkoPop] ([Id])
GO

ALTER TABLE [BlogPost] ADD FOREIGN KEY ([FunkoPopId]) REFERENCES [FunkoPop] ([Id])
GO

ALTER TABLE [FunkoPopSeries] ADD FOREIGN KEY ([SeriesId]) REFERENCES [Series] ([Id])
GO

ALTER TABLE [FunkoPopSeries] ADD FOREIGN KEY ([FunkoPopId]) REFERENCES [FunkoPop] ([Id])
GO
