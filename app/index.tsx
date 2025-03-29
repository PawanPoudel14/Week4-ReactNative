import React, { useState } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define a type for the book
interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
}

export default function LibraryApp() {
  const [books, setBooks] = useState<Book[]>([
    { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Book Case" },
    { id: "2", title: "1984", author: "George Orwell", category: "No Noise" },
    { id: "3", title: "The Catcher in the Rye", author: "J.D. Salinger", category: "Sports" },
  ]);
  const [newBook, setNewBook] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Book Case");
  const [searchQuery, setSearchQuery] = useState("");

  const addBook = () => {
    if (newBook && newAuthor) {
      setBooks([...books, { id: Math.random().toString(), title: newBook, author: newAuthor, category: newCategory }]);
      setNewBook("");
      setNewAuthor("");
    }
  };

  const filteredBooks = books.filter(
    (book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Define the renderItem function with the Book type
  const renderItem = ({ item }: { item: Book }) => (
    <View style={[styles.bookItem, { backgroundColor: item.category === "Sports" ? "#ffeb3b" : "#fff" }]}>
      <Ionicons
        name={item.category === "Sports" ? "football" : item.category === "No Noise" ? "volume-mute" : "book"}
        size={24}
        color="#007bff"
        style={styles.categoryIcon}
      />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookCategory}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Smart Library</Text>

      {/* Display your name at the top */}
      <Text style={styles.name}>Pawan Poudel</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Books..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredBooks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={newBook}
        onChangeText={setNewBook}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={newAuthor}
        onChangeText={setNewAuthor}
      />
      <View style={styles.categoryPicker}>
        <Text style={styles.categoryText}>Category:</Text>
        <View style={styles.categorySelect}>
          <Button title="Book Case" onPress={() => setNewCategory("Book Case")} color="#007bff" />
          <Button title="No Noise" onPress={() => setNewCategory("No Noise")} color="#007bff" />
          <Button title="Sports" onPress={() => setNewCategory("Sports")} color="#007bff" />
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addBook}>
        <Ionicons name="add-circle" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
    color: "#007bff", // Color for your name
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  icon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  bookItem: {
    padding: 15,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  bookDetails: {
    marginLeft: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bookAuthor: {
    color: "#666",
  },
  bookCategory: {
    color: "#007bff",
    fontStyle: "italic",
  },
  categoryIcon: {
    flex: 1,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  categoryPicker: {
    marginBottom: 15,
  },
  categoryText: {
    fontSize: 16,
    color: "#007bff",
    marginBottom: 5,
  },
  categorySelect: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
